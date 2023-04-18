import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  isPlaying,
  currentSong,
  nextSong,
  previousSong,
  isShuffleActive,
  setcurrentActivePlaylistId,
} from "../../actions/playerActions";
const Navbar = ({
  isPlaying,
  previousSong,
  currentSong,
  nextSong,
  setcurrentActivePlaylistId,
  isShuffleActive,
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
  nextSong: PropTypes.func,
  isShuffleActive: PropTypes.func.isRequired,
  setcurrentActivePlaylistId: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  isPlaying: isPlaying,
  previousSong: previousSong,
  currentSong: currentSong,
  nextSong: nextSong,
  isShuffleActive: isShuffleActive,
  setcurrentActivePlaylistId: setcurrentActivePlaylistId,
};
export default connect(null, mapDispatchToProps)(memo(Navbar));
