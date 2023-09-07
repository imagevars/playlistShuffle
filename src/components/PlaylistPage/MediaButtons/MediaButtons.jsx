import React, { memo } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import {
  MdSkipPrevious,
  MdSkipNext,
  MdShuffle,
  MdRepeat,
  MdRepeatOne,
} from 'react-icons/md';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  isPlaying,
  currentSong,
  isLoopActive,
  isMutedActive,
  isShuffleActive,
} from '../../../redux/actions/playerActions';
import { lastPlayedIndexPlaylistDetails } from '../../../redux/actions/playlistDetailsActions';

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
      }
    };

    const handleClickNextButton = () => {
      if (
        currIndex < playlistSongsById[player.currentActivePlaylistId].length - 1
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
      } else if (
        currIndex
        === playlistSongsById[player.currentActivePlaylistId].length - 1
      ) {
        // eslint-disable-next-line
        console.log('No more songs left');
      }
    };

    const handleClickShuffle = () => {
      isShuffleActive(true);
    };

    return (
      <div
        className="flex justify-center w-[95%]"
      >

        {player.isLoopActive === true ? (
          <button
            type="button"
            aria-label="no repeat video"
            className=" p-[0.25rem] md:p-[0.50rem] cursor-auto"
          >
            <MdRepeatOne
              className="hover:drop-shadow-none dark:text-primaryColorDarkMode  text-primaryColor drop-shadow-svgShadow dark:drop-shadow-svgShadowDarkMode  hover:scale-110"
              onClick={() => isLoopActive(false)}
              size={40}
            />
          </button>
        ) : (
          <button
            type="button"
            aria-label="repeat video"
            className="hover:drop-shadow-2xl cursor-auto p-[0.25rem] md:p-[0.50rem]"
          >
            <MdRepeat
              className="hover:drop-shadow-none dark:text-primaryColorDarkMode  text-primaryColor drop-shadow-svgShadow dark:drop-shadow-svgShadowDarkMode  hover:scale-110"
              onClick={() => isLoopActive(true)}
              size={40}
            />
          </button>
        )}
        <div
          className="flex items-center"
        >
          <button
            type="button"
            aria-label="previous video"
            className=" p-[0.25rem] md:p-[0.50rem]  cursor-auto "
          >
            <MdSkipPrevious
              className="hover:drop-shadow-none dark:text-primaryColorDarkMode  text-primaryColor drop-shadow-svgShadow dark:drop-shadow-svgShadowDarkMode  hover:scale-110"
              onClick={handleClickPreviousButton}
              size={40}
            />
          </button>
          {player.isPlaying === true ? (
            <button
              type="button"
              aria-label="pause video"
              className="
              bg-white rounded-full cursor-auto"
            >
              <AiFillPauseCircle
                style={{ color: `${player.darkMode ? '#13c3ff' : '#660033'}` }}
                onClick={() => isPlaying(false)}
                size={50}
              />
            </button>
          ) : (
            <button
              type="button"
              aria-label="play video"
              className="bg-white cursor-auto  rounded-full"
            >
              <AiFillPlayCircle
                style={{ color: `${player.darkMode ? '#13c3ff' : '#660033'}` }}
                onClick={() => isPlaying(true)}
                size={50}
              />
            </button>
          )}
          <button
            type="button"
            aria-label="next video"
            className=" p-[0.25rem] md:p-[0.50rem] cursor-auto"
          >
            <MdSkipNext
              className="hover:drop-shadow-none dark:text-primaryColorDarkMode text-primaryColor drop-shadow-svgShadow dark:drop-shadow-svgShadowDarkMode  hover:scale-110"
              onClick={handleClickNextButton}
              size={40}
            />
          </button>
        </div>
        <button
          type="button"
          aria-label="shuffle playlist"
          className=" p-[0.25rem] md:p-[0.50rem] cursor-auto "
        >
          <MdShuffle
            className="hover:drop-shadow-none text-primaryColor dark:text-primaryColorDarkMode drop-shadow-svgShadow dark:drop-shadow-svgShadowDarkMode  hover:scale-110"
            onClick={handleClickShuffle}
            size={40}
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
    darkMode: PropTypes.bool.isRequired,
  }).isRequired,
  isPlaying: PropTypes.func.isRequired,
  isLoopActive: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  playlistDetails: PropTypes.arrayOf(PropTypes.shape({
    playlistName: PropTypes.string.isRequired,
    playlistId: PropTypes.string.isRequired,
    playlistImage: PropTypes.string.isRequired,
    playlistEtag: PropTypes.string.isRequired,
    currentIndex: PropTypes.number.isRequired,

  })).isRequired,
  lastPlayedIndexPlaylistDetails: PropTypes.func.isRequired,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaButtons);
