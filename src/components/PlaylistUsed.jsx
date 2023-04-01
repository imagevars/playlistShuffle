import React from "react";
import { connect } from "react-redux";
import { fetchData } from "./utils/fetchData";
import { useNavigate } from "react-router-dom";

const PlaylistUsed = ({
  playlistDetails,
  addSongs,
  currentSong,
  nextSong,
  deleteFromPlaylistDetails,
}) => {
  console.log("maaap  ", playlistDetails);
  const navigate = useNavigate();

  const handleClick = async (id) => {
    console.log("eeeee  ", id);

    const data = await fetchData(id);
    addSongs(data.responseArrToAdd);
    currentSong(data.currentSong);
    nextSong(data.nextSong);

    navigate(`/playlist/${id}`);
  };

  const deleteFromPlaylist = (id) => {
    
    console.log(id);
    deleteFromPlaylistDetails(id)
  };

  return (
    <div className="playlistUsed">
      {playlistDetails ? (
        playlistDetails.map((element) => (
          <div className="playlistUsed" key={element.playlistId}>
            <div
              onClick={() => handleClick(element.playlistId)}
              
              className="usedContent"
            >
              <img src={element.PlaylistImage} height="auto" width="auto" />
              <p className="usedPlaylistName">{element.playlistName}</p>
            </div>
            <button className="playlistUsedButton" onClick={() => deleteFromPlaylist(element.playlistId)}>
              X
            </button>
          </div>
        ))
      ) : (
        <p>No Playlist Used</p>
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
