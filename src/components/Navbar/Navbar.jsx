import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  isPlaying,
  currentSong,
  nextSong,
  previousSong,
  isShuffleActive,
  setCurrentActivePlaylistId,
} from '../../redux/actions/playerActions';

function Navbar({
  isPlaying,
  previousSong,
  currentSong,
  nextSong,
  setCurrentActivePlaylistId,
  isShuffleActive,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    isPlaying(true);
    previousSong('');
    currentSong('');
    nextSong('');
    isShuffleActive(false);
    setCurrentActivePlaylistId('');
    return navigate('/');
  };
  return (
    <div className="navbar flex justify-center">
      {/* eslint-disable-next-line */}
      <h1
        className="navbar text-4xl underline text-white font-bold cursor-pointer"
        cursor="pointer"
        onClick={handleClick}
      >
        Playlist Shuffle
        {' '}
      </h1>
    </div>
  );
}

Navbar.propTypes = {
  isPlaying: PropTypes.func.isRequired,
  previousSong: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  nextSong: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  setCurrentActivePlaylistId: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  isPlaying,
  previousSong,
  currentSong,
  nextSong,
  isShuffleActive,
  setCurrentActivePlaylistId,
};
export default connect(null, mapDispatchToProps)(memo(Navbar));
