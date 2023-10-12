import React, { memo } from "react";
import { BiPlay, BiPause } from "react-icons/bi";
import {
  MdSkipPrevious,
  MdSkipNext,
  MdShuffle,
  MdRepeat,
  MdRepeatOne,
} from "react-icons/md";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  isPlaying,
  currentSong,
  isLoopActive,
  isMutedActive,
  isShuffleActive,
} from "../../../redux/actions/playerActions";
import {
  lastPlayedIndexPlaylistDetails,
  setPlaylistImage,
} from "../../../redux/actions/playlistDetailsActions";

const MediaButtons = memo(
  ({
    player,
    isPlaying,
    isLoopActive,
    isShuffleActive,
    currentSong,
    playlistSongsById,
    playlistDetails,
    lastPlayedIndexPlaylistDetails,
    setPlaylistImage,
  }) => {
    const findPlaylistIndex = playlistDetails.findIndex(
      (element) => element.playlistId === player.currentActivePlaylistId,
    );
    const currIndex = playlistDetails[findPlaylistIndex].currentIndex;

    const handleClickPreviousButton = () => {
      if (currIndex > 0) {
        const lastPlayedObj = {
          currentIndex: playlistDetails[findPlaylistIndex].currentIndex - 1,
          playlistId: player.currentActivePlaylistId,
        };
        lastPlayedIndexPlaylistDetails(lastPlayedObj);
        currentSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex - 1]
            ?.snippet.resourceId.videoId,
        );
        const obj = {
          playlistId: player.currentActivePlaylistId,
          playlistImage: `https://i.ytimg.com/vi/${
            playlistSongsById[player.currentActivePlaylistId][currIndex - 1]
              ?.snippet.resourceId.videoId
          }/mqdefault.jpg`,
        };
        setPlaylistImage(obj);
      }
    };

    const handleClickNextButton = () => {
      if (
        currIndex <
        playlistSongsById[player.currentActivePlaylistId].length - 1
      ) {
        const lastPlayedObj = {
          currentIndex: playlistDetails[findPlaylistIndex].currentIndex + 1,
          playlistId: player.currentActivePlaylistId,
        };
        lastPlayedIndexPlaylistDetails(lastPlayedObj);
        currentSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex + 1]
            ?.snippet.resourceId.videoId,
        );
        const obj = {
          playlistId: player.currentActivePlaylistId,
          playlistImage: `https://i.ytimg.com/vi/${
            playlistSongsById[player.currentActivePlaylistId][currIndex + 1]
              ?.snippet.resourceId.videoId
          }/mqdefault.jpg`,
        };
        setPlaylistImage(obj);
      } else if (
        currIndex ===
        playlistSongsById[player.currentActivePlaylistId].length - 1
      ) {
        // empty
      }
    };

    const handleClickShuffle = () => {
      isShuffleActive(true);
    };

    return (
      <div className="flex justify-center w-[95%]">
        {player.isLoopActive === true ? (
          <button
            type="button"
            aria-label="no repeat video"
            className=" p-[0.25rem] mx-2 md:mx-0 md:p-[0.50rem] cursor-auto"
          >
            <MdRepeatOne
              className="active:drop-shadow-none  text-primary hover:text-secondary   drop-shadow-svgShadow dark:drop-shadow-svgShadowDarkMode  active:scale-110"
              onClick={() => isLoopActive(false)}
              size={35}
            />
          </button>
        ) : (
          <button
            type="button"
            aria-label="repeat video"
            className="active:drop-shadow-2xl cursor-auto p-[0.25rem] md:p-[0.50rem] mx-2 md:mx-0"
          >
            <MdRepeat
              className="active:drop-shadow-none  text-primary hover:text-secondary    drop-shadow-svgShadow dark:drop-shadow-svgShadowDarkMode  active:scale-110"
              onClick={() => isLoopActive(true)}
              size={35}
            />
          </button>
        )}
        <div className="flex items-center">
          <button
            type="button"
            aria-label="previous video"
            className=" p-[0.25rem] md:p-[0.50rem]  cursor-auto mx-1 md:mx-0"
          >
            <MdSkipPrevious
              className="active:drop-shadow-none text-primary hover:text-secondary    drop-shadow-svgShadow dark:drop-shadow-svgShadowDarkMode  active:scale-110"
              onClick={handleClickPreviousButton}
              size={35}
            />
          </button>
          {player.isPlaying === true ? (
            <button
              type="button"
              aria-label="pause video"
              className="
               rounded-full cursor-auto bg-accent mx-1 md:mx-0 my-0.5"
            >
              <BiPause
                className="active:scale-105 text-primary"
                onClick={() => isPlaying(false)}
                size={50}
              />
            </button>
          ) : (
            <button
              type="button"
              aria-label="play video"
              className="cursor-auto rounded-full bg-accent mx-1 md:mx-0 my-0.5"
            >
              <BiPlay
                className="active:scale-105 pl-1 text-primary"
                onClick={() => isPlaying(true)}
                size={50}
              />
            </button>
          )}
          <button
            type="button"
            aria-label="next video"
            className=" p-[0.25rem] md:p-[0.50rem] cursor-auto mx-1 md:mx-0"
          >
            <MdSkipNext
              className="active:drop-shadow-none text-primary hover:text-secondary   drop-shadow-svgShadow dark:drop-shadow-svgShadowDarkMode  active:scale-110"
              onClick={handleClickNextButton}
              size={35}
            />
          </button>
        </div>
        <button
          type="button"
          aria-label="shuffle playlist"
          className=" p-[0.25rem] md:p-[0.50rem] cursor-auto mx-2 md:mx-0"
        >
          <MdShuffle
            className="active:drop-shadow-none text-primary hover:text-secondary  drop-shadow-svgShadow dark:drop-shadow-svgShadowDarkMode  active:scale-110"
            onClick={handleClickShuffle}
            size={35}
          />
        </button>
      </div>
    );
  },
);

MediaButtons.propTypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    currentSong: PropTypes.string.isRequired,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
  }).isRequired,
  isPlaying: PropTypes.func.isRequired,
  isLoopActive: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  playlistDetails: PropTypes.arrayOf(
    PropTypes.shape({
      playlistName: PropTypes.string.isRequired,
      playlistId: PropTypes.string.isRequired,
      playlistImage: PropTypes.string.isRequired,
      playlistEtag: PropTypes.string.isRequired,
      currentIndex: PropTypes.number.isRequired,
    }),
  ).isRequired,
  lastPlayedIndexPlaylistDetails: PropTypes.func.isRequired,
  setPlaylistImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
});

const mapDispatchToProps = {
  isPlaying,
  isLoopActive,
  isShuffleActive,
  currentSong,
  isMutedActive,
  lastPlayedIndexPlaylistDetails,
  setPlaylistImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaButtons);
