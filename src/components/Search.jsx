import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { fetchData } from "./utils/fetchData";

const Search = ({ addSongs, currentSong, nextSong, addToPlaylistDetails }) => {
  const [playlistId, setPlaylistId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(playlistId);

    const regex = /PL(.*)/;
    const match = playlistId.match(regex);
    const id = "PL" + match[1];

    //https://www.youtube.com/playlist?list=PLi06ybkpczJDt0Ydo3Umjtv97bDOcCtAZ

    const data = await fetchData(id);

    addToPlaylistDetails(data.playlistDetailsObject);
    addSongs(data.responseArrToAdd);
    currentSong(data.currentSong);
    nextSong(data.nextSong);

    navigate(`/playlist/${id}`);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setPlaylistId(e.target.value);
  };
  return (
    <div className="searchContaienr">
      <div>Enter Youtube playlist</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          pattern="^(https?:\/\/)?(www\.)?youtube\.com\/playlist\?list=PL[a-zA-Z0-9_-]+$|^(PL[a-zA-Z0-9_-]+)$"
          title="Please enter a valid YouTube playlist URL or ID"
          type="text"
          onChange={(e) => handleChange(e)}
          value={playlistId}
          placeholder="playlist url or playlist ID"
        />
        <button className="  " type="submit">
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
