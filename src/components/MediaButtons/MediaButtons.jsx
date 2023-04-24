import React, { memo } from 'react';
import {
  BiPlayCircle,
  BiPauseCircle,
  BiShuffle,
  BiSkipPreviousCircle,
  BiSkipNextCircle,
  BiVolumeMute,
  BiVolumeFull,
  BiFullscreen,
  BiExitFullscreen,
} from 'react-icons/bi';
import PropTypes from 'prop-types';
import { TbRepeatOff, TbRepeatOnce } from 'react-icons/tb';
import { connect } from 'react-redux';
import {
  isPlaying,
  currentSong,
  nextSong,
  isLoopActive,
  isMutedActive,
  isShuffleActive,
  previousSong,
  isFullScreenActive,
} from '../../redux/actions/playerActions';

const MediaButtons = memo(
  ({
    player,
    isPlaying,
    isLoopActive,
    isShuffleActive,
    previousSong,
    currentSong,
    nextSong,
    playlistSongsById,
    isMutedActive,
    isFullScreenActive,
  }) => {
    const handleClickPreviousButton = () => {
      const currIndex = playlistSongsById[
        player.currentActivePlaylistId
      ].findIndex((song) => song.snippet.resourceId.videoId === player.currentSong);
      if (currIndex !== 0) {
        previousSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex - 2]
            ?.snippet.resourceId.videoId,
        );
        currentSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex - 1]
            ?.snippet.resourceId.videoId,
        );
        nextSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex]?.snippet
            .resourceId.videoId,
        );
      }
    };
    const handleClickNextButton = () => {
      const currIndex = playlistSongsById[
        player.currentActivePlaylistId
      ].findIndex((ele) => ele.snippet?.resourceId.videoId === player.currentSong);

      if (
        currIndex
        < playlistSongsById[player.currentActivePlaylistId].length - 1
      ) {
        previousSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex]?.snippet
            .resourceId.videoId,
        );
        currentSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex + 1]
            ?.snippet.resourceId.videoId,
        );
        nextSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex + 2]
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
    const handleClickFullScreen = () => {
      isFullScreenActive(true);
    };
    return (
      <div className=" text-[#624aa0] font-bold  flex items-center ">
        {player.isMutedActive === true ? (
          <button type="button" className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <BiVolumeMute size={40} onClick={() => isMutedActive(false)} />
          </button>
        ) : (
          <button type="button" className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <BiVolumeFull size={40} onClick={() => isMutedActive(true)} />
          </button>
        )}

        {player.isLoopActive === true ? (
          <button type="button" className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <TbRepeatOnce onClick={() => isLoopActive(false)} size={40} />
          </button>
        ) : (
          <button type="button" className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <TbRepeatOff onClick={() => isLoopActive(true)} size={40} />
          </button>
        )}

        <button type="button" className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
          <BiSkipPreviousCircle
            onClick={handleClickPreviousButton}
            size={40}
          />
        </button>
        {player.isPlaying === true ? (
          <button type="button" className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <BiPauseCircle onClick={() => isPlaying(false)} size={50} />
          </button>
        ) : (
          <button type="button" className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <BiPlayCircle onClick={() => isPlaying(true)} size={50} />
          </button>
        )}
        <button type="button" className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
          <BiSkipNextCircle onClick={handleClickNextButton} size={40} />
        </button>
        <button type="button" className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
          <BiShuffle onClick={handleClickShuffle} size={40} />
        </button>

        {player.isFullScreenActive === true ? (
          <button type="button" className="cursor-pointer  md:hidden hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <BiExitFullscreen onClick={handleClickFullScreen} size={40} />
          </button>
        ) : (
          <button type="button" className="cursor-pointer  md:hidden hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <BiFullscreen onClick={handleClickFullScreen} size={40} />
          </button>
        )}
      </div>
    );
  },
);

MediaButtons.propTypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    previousSong: PropTypes.string,
    currentSong: PropTypes.string.isRequired,
    nextSong: PropTypes.string,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
    isFullScreenActive: PropTypes.bool.isRequired,
  }).isRequired,
  isPlaying: PropTypes.func.isRequired,
  isLoopActive: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  previousSong: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  nextSong: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  isMutedActive: PropTypes.func.isRequired,
  isFullScreenActive: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
});

const mapDispatchToProps = {
  isPlaying,
  isLoopActive,
  isShuffleActive,
  previousSong,
  currentSong,
  nextSong,
  isMutedActive,
  isFullScreenActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaButtons);
