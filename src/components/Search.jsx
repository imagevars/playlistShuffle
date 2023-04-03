import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { fetchData } from "./utils/fetchData";
import { stringify } from "postcss";

const Search = ({ addSongs, currentSong, nextSong, addToPlaylistDetails }) => {
  const [playlistId, setPlaylistId] = useState("");
  const navigate = useNavigate();

  const baseURL = import.meta.env.BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regex = /PL(.*)/;
    const match = playlistId.match(regex);
    const id = "PL" + match[1];

    const data = await fetchData(id);

    addSongs(data.responseArrToAdd);
    currentSong(data.currentSong);
    nextSong(data.nextSong);

      addToPlaylistDetails(data.playlistDetailsObject)
    navigate(`${baseURL}playlist/${id}`);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setPlaylistId(e.target.value);
  };
  return (
    <div className="searchContaienr">
      <div className="searchText">Enter a Youtube playlist</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="inputSearch"
          pattern="^(?=.*.{24,})(?=.*PL).*"
          title="Please enter a valid YouTube playlist URL or ID"
          type="text"
          required
          onChange={(e) => handleChange(e)}
          value={playlistId}
          placeholder="playlist url or playlist ID"
        />
        <button className="submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSongs: (payload) => dispatch({ type: "songs/addSongs", payload }),
    currentSong: (payload) => dispatch({ type: "player/currentSong", payload }),
    nextSong: (payload) => dispatch({ type: "player/nextSong", payload }),
    addToPlaylistDetails: (payload) =>
      dispatch({ type: "playlistDetails/addToPlaylistDetails", payload }),

  };
};

export default connect(null, mapDispatchToProps)(Search);