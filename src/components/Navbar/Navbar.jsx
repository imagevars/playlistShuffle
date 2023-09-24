import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  BsFillMoonFill, BsFillSunFill, BsTwitter, BsImageFill,
} from 'react-icons/bs';
import PropTypes from 'prop-types';
import {
  isPlaying,
  currentSong,
  isShuffleActive,
  setCurrentActivePlaylistId,
  setTheme,
  setTitle,
  setArtist,
} from '../../redux/actions/playerActions';

function Navbar({
  isPlaying,
  setCurrentActivePlaylistId,
  isShuffleActive,
  player,
  setTheme,
  setTitle,
  setArtist,
}) {
  const navigate = useNavigate();

  const handleClickHome = () => {
    isPlaying(true);
    isShuffleActive(false);
    setCurrentActivePlaylistId('');
    setTitle('');
    setArtist('');

    return navigate('/');
  };

  useEffect(() => {
    if (player.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('image');
      document.documentElement.classList.add('light');
    }
    if (player.theme === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.remove('image');
      document.documentElement.classList.add('dark');
    }
    if (player.theme === 'image') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('image');
    }
  }, []);

  const handleClickDarkMode = () => {
    if (player.theme === 'light') {
      document.documentElement.classList.remove('image');
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
    if (player.theme === 'dark') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('image');
      setTheme('image');
    }
    if (player.theme === 'image') {
      document.documentElement.classList.remove('image');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      setTheme('light');
    }
  };

  return (
    <div className=" w-full flex justify-between px-1">
      <div className="flex justify-between w-full mx-2 md:max-w-[2000x]">
        {/* eslint-disable-next-line */}
        <a href="https://twitter.com/Jonathhn1" className="w-24" target="_blank" rel="noopener noreferrer" aria-label="github link">
          <BsTwitter size={25} fill="#1DA1F2" />
        </a>
        {/* eslint-disable-next-line */}
        <h1
          className="navbar text-2xl font-open text-center text-textColor font-bold cursor-pointer"
          cursor="pointer"
          onClick={handleClickHome}
        >
          Shuffle Playlist
          {' '}
        </h1>
        {player.theme === 'image' && (
          <div className="w-24 flex justify-end">
            <BsFillSunFill fill="white" onClick={handleClickDarkMode} className="cursor-pointer mt-1" aria-label="sun icon" size={25} />
          </div>
        )}
        {player.theme === 'dark' && (
          <div className="w-24 flex justify-end">
            <BsImageFill fill="white" onClick={handleClickDarkMode} className="cursor-pointer mt-1" aria-label="image icon" size={25} />
          </div>
        )}
        {player.theme === 'light' && (
          <div className="w-24 flex justify-end">
            <BsFillMoonFill fill="black" onClick={handleClickDarkMode} className="cursor-pointer mt-1" aria-label="moon icon" size={25} />
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
    theme: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  }).isRequired,
  isPlaying: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  setCurrentActivePlaylistId: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setArtist: PropTypes.func.isRequired,

};

const mapDispatchToProps = {
  isPlaying,
  currentSong,
  isShuffleActive,
  setCurrentActivePlaylistId,
  setTheme,
  setTitle,
  setArtist,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Navbar));
