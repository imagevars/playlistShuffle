import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { BsFillMoonFill, BsFillSunFill, BsImageFill } from "react-icons/bs";
import PropTypes from "prop-types";
import {
  isPlaying,
  isShuffleActive,
  setCurrentActivePlaylistId,
  setTheme,
  setTitle,
  setArtist,
} from "../../redux/actions/playerActions";

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
    setCurrentActivePlaylistId("");
    setTitle("");
    setArtist("");

    return navigate("/");
  };

  useEffect(() => {
    if (player.theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("image");
      document.documentElement.classList.add("light");
    }
    if (player.theme === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.remove("image");
      document.documentElement.classList.add("dark");
    }
    if (player.theme === "image") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("image");
    }
  }, []);

  const handleClickTheme = () => {
    if (player.theme === "light") {
      document.documentElement.classList.remove("image");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
    if (player.theme === "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("image");
      setTheme("image");
    }
    if (player.theme === "image") {
      document.documentElement.classList.remove("image");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setTheme("light");
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
            Shuffle Playlist{" "}
          </h1>
        </button>
        <div className="flex flex-row mr-2">
          <div className="mx-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ko-fi link"
              href="https://ko-fi.com/playlistshuffle"
            >
              <div className="flex justify-evenly flex-row bg-primary hover:scale-105	hover:bg-kofiHover  active:scale-110 rounded-md  max-w-[160px] py-0.5 px-3 md:px-6 ">
                <img
                  className="w-8 my-auto"
                  src="./assets/images/Logo_white.png"
                  alt="ko-fi"
                />
                <p className=" my-auto ml-0.5 font-nunito tracking-normal leading-4 text-sm md:text-md text-center text-textColorInside font-bold italic">
                  Buy me <br />a coffee
                </p>
              </div>
            </a>
          </div>
          {player.theme === "image" && (
            <div className="my-auto mr-1">
              <BsFillSunFill
                fill="white"
                onClick={handleClickTheme}
                className="cursor-pointer"
                aria-label="sun icon"
                size={25}
              />
            </div>
          )}
          {player.theme === "dark" && (
            <div className="my-auto mr-1">
              <BsImageFill
                fill="white"
                onClick={handleClickTheme}
                className="cursor-pointer"
                aria-label="image icon"
                size={25}
              />
            </div>
          )}
          {player.theme === "light" && (
            <div className="my-auto mr-1">
              <BsFillMoonFill
                fill="black"
                onClick={handleClickTheme}
                className="cursor-pointer"
                aria-label="moon icon"
                size={25}
              />
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
};

const mapDispatchToProps = {
  isPlaying,
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
