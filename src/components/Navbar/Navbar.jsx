import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { AiFillGithub } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { lastPlayedPlaylistDetailsAll } from '../../redux/actions/playlistDetailsActions';
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
  player,
  lastPlayedPlaylistDetailsAll,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (player.rememberLastVideo === false) {
      lastPlayedPlaylistDetailsAll();
    }
    isPlaying(true);
    previousSong('');
    currentSong('');
    nextSong('');
    isShuffleActive(false);
    setCurrentActivePlaylistId('');
    return navigate('/');
  };

  return (
    <div className="navbar flex justify-between">
      <a href="https://github.com/jooonathann/playlistShuffle">
        <AiFillGithub fill="black" size={30} />
      </a>
      {/* eslint-disable-next-line */}
      <h1
        className="navbar text-2xl underline text-black font-bold cursor-pointer"
        cursor="pointer"
        onClick={handleClick}
      >
        Shuffle Playlist
        {' '}
      </h1>
      <div />

    </div>
  );
}

Navbar.propTypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    previousSong: PropTypes.string,
    currentSong: PropTypes.string.isRequired,
    nextSong: PropTypes.string,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
    rememberLastVideo: PropTypes.bool.isRequired,
  }).isRequired,
  isPlaying: PropTypes.func.isRequired,
  previousSong: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  nextSong: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  setCurrentActivePlaylistId: PropTypes.func.isRequired,
  lastPlayedPlaylistDetailsAll: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  isPlaying,
  previousSong,
  currentSong,
  nextSong,
  isShuffleActive,
  setCurrentActivePlaylistId,
  lastPlayedPlaylistDetailsAll,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Navbar));
