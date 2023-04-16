import React, { memo } from "react";
import {
  PLAYER_ISPLAYING,
  PLAYER_ISLOOPACTIVE,
  PLAYER_ISSHUFFLEACTIVE,
  PLAYER_PREVIOUSSONG,
  PLAYER_NEXTSONG,
  PLAYER_CURRENTSONG,
} from "../../constants/playerTypes";
import {
  BiPlayCircle,
  BiPauseCircle,
  BiShuffle,
  BiSkipPreviousCircle,
  BiSkipNextCircle,
} from "react-icons/bi";
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
        {player.isLoopActive === true ? (
          <div passive="true">
            <TbRepeatOnce
              className="cursor-pointer"
              onClick={() => isLoopActive(false)}
              size={45}
            />
          </div>
        ) : (
          <div>
            <TbRepeatOff
              className="cursor-pointer"
              onClick={() => isLoopActive(true)}
              size={45}
            />
          </div>
        )}

        <div>
          {
            <BiSkipPreviousCircle
              className="cursor-pointer"
              onClick={handleClickPreviousButton}
              size={45}
            />
          }
        </div>
        {player.isPlaying === true ? (
          <div>
            <BiPauseCircle
              className="cursor-pointer"
              onClick={() => isPlaying(false)}
              size={55}
            />
          </div>
        ) : (
          <div>
            <BiPlayCircle
              className="cursor-pointer"
              onClick={() => isPlaying(true)}
              size={55}
            />
          </div>
        )}
        <div>
          <BiSkipNextCircle
            className="cursor-pointer"
            onClick={handleClickNextButton}
            size={45}
          />
        </div>
        {player.isShuffleActive ? (
          <div>
            <BiShuffle
              className="cursor-pointer"
              onClick={handleClickShuffle}
              size={45}
            />
          </div>
        ) : (
          <div>
            <BiShuffle
              className="cursor-pointer"
              onClick={handleClickShuffle}
              size={45}
            />
          </div>
        )}
      </div>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    player: state.player,
    songs: state.songs,
    playlistSongsById: state.playlistSongsById,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isPlaying: (payload) => dispatch({ type: PLAYER_ISPLAYING, payload }),
    isLoopActive: (payload) => dispatch({ type: PLAYER_ISLOOPACTIVE, payload }),
    isShuffleActive: (payload) =>
      dispatch({ type: PLAYER_ISSHUFFLEACTIVE, payload }),
    previousSong: (payload) => dispatch({ type: PLAYER_PREVIOUSSONG, payload }),
    currentSong: (payload) => dispatch({ type: PLAYER_CURRENTSONG, payload }),
    nextSong: (payload) => dispatch({ type: PLAYER_NEXTSONG, payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaButtons);
