import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
    <div className="navbar flex justify-center">
      <h1
        className="navbar text-4xl  text-white font-bold cursor-pointer"
        cursor={"pointer"}
        onClick={handleClick}
      >
        Playlist Shuffle{" "}
      </h1>
    </div>
  );
};

Navbar.propTypes = {
  isPlaying: PropTypes.func.isRequired,
  previousSong: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  nextSong: PropTypes.func,  isShuffleActive: PropTypes.func.isRequired,
  setcurrentActivePlaylistId: PropTypes.func.isRequired,
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
export default connect(null, mapDispatchToProps)(memo(Navbar));
