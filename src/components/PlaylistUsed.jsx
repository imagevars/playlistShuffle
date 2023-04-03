import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "./utils/fetchData";
import { useNavigate } from "react-router-dom";

const PlaylistUsed = ({
  playlistDetails,
  addSongs,
  currentSong,
  nextSong,
  deleteFromPlaylistDetails,
  addToPlaylistDetails
}) => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.BASE_URL;



  useEffect(() => {
    console.log('playlistUSEDQQQQ', playlistDetails)
  })

  const playlists =playlistDetails.map(
    (element) => (
      <div className="playlistUsedList" key={element.playlistId}>
        <div
          onClick={() => handleClick(element.playlistId)}
          className="usedContentTextandImage"
        >
          <img className="imgUsedPlaylist" src={element.PlaylistImage}  />
          <p className="usedPlaylistName">{element.playlistName}</p>
        </div>
        <button
          className="playlistUsedButton"
          onClick={() => deleteFromPlaylist(element.playlistId)}
        >
          X
        </button>
      </div>
    )
  );

  const handleClick = async (id) => {
    const data = await fetchData(id);
    addSongs(data.responseArrToAdd);
    currentSong(data.currentSong);
    nextSong(data.nextSong);

    navigate(`${baseURL}playlist/${id}`);
  };

  const deleteFromPlaylist = (id) => {
    deleteFromPlaylistDetails(id)

  };

  return (
    <div className="playlistUsedContainer">
      {playlistDetails.length ? (
        playlists
      ) : (
        null
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    player: state.player,
    playlistDetails: state.playlistDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSongs: (payload) => dispatch({ type: "songs/addSongs", payload }),
    currentSong: (payload) => dispatch({ type: "player/currentSong", payload }),
    nextSong: (payload) => dispatch({ type: "player/nextSong", payload }),
    addToPlaylistDetails: (payload) =>
      dispatch({ type: "playlistDetails/addToPlaylistDetails", payload }),

      deleteFromPlaylistDetails: (payload) =>
      dispatch({ type: "playlistDetails/deleteFromPlaylistDetails", payload }),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistUsed);
