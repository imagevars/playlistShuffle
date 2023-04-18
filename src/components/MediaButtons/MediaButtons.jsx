import React, { memo } from "react";
import {
  isPlaying,
  currentSong,
  nextSong,
  isLoopActive,
  isMutedActive,
  isShuffleActive,
  previousSong,
} from "../../actions/playerActions";
import {
  BiPlayCircle,
  BiPauseCircle,
  BiShuffle,
  BiSkipPreviousCircle,
  BiSkipNextCircle,
  BiVolumeMute,
  BiVolumeFull,
} from "react-icons/bi";
import PropTypes from "prop-types";
import { TbRepeatOff, TbRepeatOnce } from "react-icons/tb";
import { connect } from "react-redux";

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
  }) => {
    const playPauseButton = (e) => {
      isPlaying(e);
    };

    const handleClickPreviousButton = () => {
      const currIndex = playlistSongsById[
        player.currentActivePlaylistId
      ].findIndex((song) => {
        return song.snippet.resourceId.videoId === player.currentSong;
      });
      if (currIndex !== 0) {
        previousSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex - 2]
            ?.snippet.resourceId.videoId
        );
        currentSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex - 1]
            ?.snippet.resourceId.videoId
        );
        nextSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex]?.snippet
            .resourceId.videoId
        );
      }
    };
    const handleClickNextButton = () => {
      const currIndex = playlistSongsById[
        player.currentActivePlaylistId
      ].findIndex((ele) => {
        return ele.snippet?.resourceId.videoId === player.currentSong;
      });

      if (
        currIndex <
        playlistSongsById[player.currentActivePlaylistId].length - 1
      ) {
        previousSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex]?.snippet
            .resourceId.videoId
        );
        currentSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex + 1]
            ?.snippet.resourceId.videoId
        );
        nextSong(
          playlistSongsById[player.currentActivePlaylistId][currIndex + 2]
            ?.snippet.resourceId.videoId
        );
      } else if (
        currIndex ===
        playlistSongsById[player.currentActivePlaylistId].length - 1
      ) {
        console.log("No more songs left");
      }
    };

    const handleClickShuffle = () => {
      if (player.isShuffleActive === false) {
        isShuffleActive(true);
      } else {
        isShuffleActive(false);
      }
    };
    return (
      <div className=" text-white flex items-center ">
        {player.isMutedActive === true ? (
          <div className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <BiVolumeMute size={45} onClick={() => isMutedActive(false)} />
          </div>
        ) : (
          <div className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <BiVolumeFull size={45} onClick={() => isMutedActive(true)} />
          </div>
        )}

        {player.isLoopActive === true ? (
          <div className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <TbRepeatOnce onClick={() => isLoopActive(false)} size={45} />
          </div>
        ) : (
          <div className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <TbRepeatOff onClick={() => isLoopActive(true)} size={45} />
          </div>
        )}

        <div className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
          {
            <BiSkipPreviousCircle
              onClick={handleClickPreviousButton}
              size={45}
            />
          }
        </div>
        {player.isPlaying === true ? (
          <div className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <BiPauseCircle onClick={() => isPlaying(false)} size={55} />
          </div>
        ) : (
          <div className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <BiPlayCircle onClick={() => isPlaying(true)} size={55} />
          </div>
        )}
        <div className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
          <BiSkipNextCircle onClick={handleClickNextButton} size={45} />
        </div>
        {player.isShuffleActive ? (
          <div className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <BiShuffle onClick={handleClickShuffle} size={45} />
          </div>
        ) : (
          <div className="cursor-pointer hover:bg-[rgba(246,247,249,.05)] rounded-[9999px] p-[0.25rem] md:p-[0.50rem]">
            <BiShuffle onClick={handleClickShuffle} size={45} />
          </div>
        )}
      </div>
    );
  }
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
  }).isRequired,
  isPlaying: PropTypes.func.isRequired,
  isLoopActive: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  previousSong: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  nextSong: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.object.isRequired,
  isMutedActive: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    playlistSongsById: state.playlistSongsById,
  };
};

const mapDispatchToProps = {
  isPlaying: isPlaying,
  isLoopActive: isLoopActive,
  isShuffleActive: isShuffleActive,
  previousSong: previousSong,
  currentSong: currentSong,
  nextSong: nextSong,
  isMutedActive: isMutedActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaButtons);
