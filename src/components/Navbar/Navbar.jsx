import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { AiFillGithub } from 'react-icons/ai';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { lastPlayedPlaylistDetailsAll } from '../../redux/actions/playlistDetailsActions';
import {
  isPlaying,
  currentSong,
  isShuffleActive,
  setCurrentActivePlaylistId,
  isDarkModeActive,
} from '../../redux/actions/playerActions';

function Navbar({
  isPlaying,
  currentSong,
  setCurrentActivePlaylistId,
  isShuffleActive,
  player,
  lastPlayedPlaylistDetailsAll,
  isDarkModeActive,
}) {
  const navigate = useNavigate();

  const handleClickHome = () => {
    if (player.rememberLastVideo === false) {
      lastPlayedPlaylistDetailsAll();
    }
    isPlaying(true);
    currentSong('');
    isShuffleActive(false);
    setCurrentActivePlaylistId('');
    return navigate('/');
  };

  const handleClickDarkMode = () => {
    if (player.darkMode === true) {
      document.documentElement.classList.remove('dark');
      isDarkModeActive(false);
    } else {
      document.documentElement.classList.add('dark');
      isDarkModeActive(true);
    }
  };

  return (
    <div className="navbar flex justify-between">
      <a href="https://github.com/jooonathann/playlistShuffle" aria-label="github link">
        <AiFillGithub fill="black" size={30} />
      </a>
      {/* eslint-disable-next-line */}
      <h1
        className="navbar text-2xl underline text-black font-bold cursor-pointer"
        cursor="pointer"
        onClick={handleClickHome}
      >
        Shuffle Playlist
        {' '}
      </h1>
      {player.darkMode === true
        ? <BsFillSunFill onClick={handleClickDarkMode} className="cursor-pointer mt-1" aria-label="dark mode moon icon" size={25} />
        : <BsFillMoonFill onClick={handleClickDarkMode} className="cursor-pointer mt-1" aria-label="dark mode moon icon" size={25} />}

    </div>
  );
}

Navbar.propTypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    currentSong: PropTypes.string.isRequired,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
    rememberLastVideo: PropTypes.bool.isRequired,
    darkMode: PropTypes.bool.isRequired,
  }).isRequired,
  isPlaying: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  setCurrentActivePlaylistId: PropTypes.func.isRequired,
  lastPlayedPlaylistDetailsAll: PropTypes.func.isRequired,
  isDarkModeActive: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  isPlaying,
  currentSong,
  isShuffleActive,
  setCurrentActivePlaylistId,
  lastPlayedPlaylistDetailsAll,
  isDarkModeActive,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Navbar));
