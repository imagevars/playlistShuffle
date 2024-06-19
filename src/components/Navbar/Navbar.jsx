import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { BsFillMoonFill, BsFillSunFill, BsImageFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import {
  isPlaying,
  isShuffleActive,
  setCurrentActivePlaylistId,
  setTheme,
  setTitle,
  setArtist,
  setWordsToSearch,
  setIsPlLoading,
} from '../../redux/actions/playerActions';
import setSearchInput from '../../redux/actions/homepageActions';

function Navbar({
  isPlaying,
  setCurrentActivePlaylistId,
  isShuffleActive,
  player,
  setTheme,
  setTitle,
  setArtist,
  setSearchInput,
  setWordsToSearch,
  setIsPlLoading,
}) {
  const navigate = useNavigate();

  const handleClickHome = () => {
    isPlaying(true);
    isShuffleActive(false);
    setCurrentActivePlaylistId('');
    setIsPlLoading(false);
    setTitle('');
    setArtist('');
    setSearchInput('');
    setWordsToSearch('');
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

  const handleClickTheme = () => {
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
    <div className=" w-full  px-1">
      <div className="flex justify-between w-full mx-1 my-1">
        <button type="button" onClick={handleClickHome}>
          <h1
            className="navbar text-lg sm:text-2xl font-open text-left text-textColor font-bold cursor-pointer"
            cursor="pointer"
          >
            Shuffle Playlist{' '}
          </h1>
        </button>
        <div className="flex flex-row mr-2">
          {player.theme === 'image' && (
            <div className="flex">
              <div className="w-44 mx-4 flex justify-evenly flex-row hover:scale-105  active:scale-110 rounded-md my-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.buymeacoffee.com/playlistshuffle"
                  aria-label="buy me a coffee link"
                >
                  <img
                    src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=playlistshuffle&button_colour=E94747&font_colour=FFFFFF&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
                    alt="buy me a coffee button"
                    className="h-[37px]"
                  />
                </a>
              </div>
              <div className="my-auto mr-1">
                <BsFillSunFill
                  fill="white"
                  onClick={handleClickTheme}
                  className="cursor-pointer"
                  aria-label="sun icon"
                  size={25}
                />
              </div>
            </div>
          )}
          {player.theme === 'dark' && (
            <div className="flex">
              <div className="w-44 mx-4 flex justify-evenly flex-row hover:scale-105  active:scale-110 rounded-md my-auto">
                <a
                  href="https://www.buymeacoffee.com/playlistshuffle"
                  aria-label="buy me a coffee link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=playlistshuffle&button_colour=008BA7&font_colour=FFFFFF&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
                    alt="buy me a coffee button"
                    className="h-[37px]"
                  />
                </a>
              </div>
              <div className="my-auto mr-1">
                <BsImageFill
                  fill="white"
                  onClick={handleClickTheme}
                  className="cursor-pointer"
                  aria-label="image icon"
                  size={25}
                />
              </div>
            </div>
          )}
          {player.theme === 'light' && (
            <div className="flex">
              <div className="w-44 mx-4 flex justify-evenly flex-row hover:scale-105  active:scale-110 rounded-md my-auto">
                <a
                  href="https://www.buymeacoffee.com/playlistshuffle"
                  aria-label="buy me a coffee link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=playlistshuffle&button_colour=006868&font_colour=FFFFFF&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
                    alt="buy me a coffee button"
                    className="h-[37px]"
                  />
                </a>
              </div>
              <div className="my-auto mr-1">
                <BsFillMoonFill
                  fill="black"
                  onClick={handleClickTheme}
                  className="cursor-pointer"
                  aria-label="moon icon"
                  size={25}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  player: PropTypes.shape({
    theme: PropTypes.string.isRequired,
  }).isRequired,
  isPlaying: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  setCurrentActivePlaylistId: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setArtist: PropTypes.func.isRequired,
  setSearchInput: PropTypes.func.isRequired,
  setWordsToSearch: PropTypes.func.isRequired,
  setIsPlLoading: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  isPlaying,
  isShuffleActive,
  setCurrentActivePlaylistId,
  setTheme,
  setTitle,
  setArtist,
  setSearchInput,
  setWordsToSearch,
  setIsPlLoading,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Navbar));
