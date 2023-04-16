import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  PLAYER_ISPLAYING,
  PLAYER_ISSHUFFLEACTIVE,
  PLAYER_CURRENTSONG,
  PLAYER_NEXTSONG,
  PLAYER_PREVIOUSSONG,
  PLAYER_SETCURRENTACTIVEPLAYLIST,
} from "../../constants/playerTypes";
const Navbar = ({
  isPlaying,
  previousSong,
  currentSong,
  nextSong,
  isShuffleActive,
  setcurrentActivePlaylistId,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    isPlaying(true);
    previousSong("");
    currentSong("");
    nextSong("");
    isShuffleActive(false);
    setcurrentActivePlaylistId("");
    return navigate("/");
  };
  return (
    <div className="navbar">
      <h1
        className="text-4xl text-center text-white font-bold cursor-pointer"
        cursor={"pointer"}
        onClick={handleClick}
      >
        Playlist Shuffle{" "}
      </h1>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    isPlaying: (payload) => dispatch({ type: PLAYER_ISPLAYING, payload }),
    previousSong: (payload) => dispatch({ type: PLAYER_PREVIOUSSONG, payload }),
    currentSong: (payload) => dispatch({ type: PLAYER_CURRENTSONG, payload }),
    nextSong: (payload) => dispatch({ type: PLAYER_NEXTSONG, payload }),
    isShuffleActive: (payload) =>
      dispatch({ type: PLAYER_ISSHUFFLEACTIVE, payload }),
    setcurrentActivePlaylistId: (payload) =>
      dispatch({ type: PLAYER_SETCURRENTACTIVEPLAYLIST, payload }),
  };
};
export default connect(null, mapDispatchToProps)(Navbar);
