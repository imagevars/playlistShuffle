import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { BsFillMoonFill, BsFillSunFill, BsTwitter } from 'react-icons/bs';
import PropTypes from 'prop-types';
import {
  isPlaying,
  currentSong,
  isShuffleActive,
  setCurrentActivePlaylistId,
  isDarkModeActive,
  setTitle,
  setArtist,
} from '../../redux/actions/playerActions';

function Navbar({
  isPlaying,
  currentSong,
  setCurrentActivePlaylistId,
  isShuffleActive,
  player,
  isDarkModeActive,
  setTitle,
  setArtist,
}) {
  const navigate = useNavigate();

  const handleClickHome = () => {
    isPlaying(true);
    currentSong('');
    isShuffleActive(false);
    setCurrentActivePlaylistId('');
    setTitle('');
    setArtist('');

    return navigate('/');
  };

  useEffect(() => {
    if (player.darkMode === true) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleClickDarkMode = () => {
    if (player.darkMode === true) {
      document.documentElement.classList.remove('dark');
      isDarkModeActive(false);
    } else {
      document.documentElement.classList.add('dark');
      isDarkModeActive(true);
    }
  };

  const style = { color: 'bgBlack' };

  return (
    <div className=" w-full flex justify-between px-1 ">
      <div className="flex justify-between w-full mx-2 md:max-w-[2000x]">
        {/* eslint-disable-next-line */}
        <a href="https://twitter.com/Jonathhn1" className="w-24" target="_blank" rel="noopener noreferrer" aria-label="github link">
          <BsTwitter size={25} fill="#1DA1F2" />
        </a>
        {/* eslint-disable-next-line */}
        <h1
          className="navbar text-2xl font-open text-center text-bgBlack dark:text-bgWhite font-bold cursor-pointer"
          cursor="pointer"
          onClick={handleClickHome}
        >
          Shuffle Playlist
          {' '}
        </h1>
        {player.darkMode === true
          ? (
            <div className="w-24 flex justify-end">
              <BsFillSunFill fill="white" onClick={handleClickDarkMode} className="cursor-pointer mt-1" aria-label="sun icon" size={25} />
            </div>
          )
          : (
            <div className="w-24 flex justify-end">
              <BsFillMoonFill style={style} onClick={handleClickDarkMode} className="cursor-pointer mt-1" aria-label="dark mode moon icon" size={25} />
            </div>
          )}
      </div>
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
    darkMode: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  }).isRequired,
  isPlaying: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  setCurrentActivePlaylistId: PropTypes.func.isRequired,
  isDarkModeActive: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setArtist: PropTypes.func.isRequired,

};

const mapDispatchToProps = {
  isPlaying,
  currentSong,
  isShuffleActive,
  setCurrentActivePlaylistId,
  isDarkModeActive,
  setTitle,
  setArtist,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Navbar));
