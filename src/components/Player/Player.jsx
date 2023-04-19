import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";
import screenfull from "screenfull";

import {
  isPlaying,
  previousSong,
  nextSong,
  currentSong,
  setProgress,
  setVideoDuration,
  isFullScreenActive,
  setPercentage,
} from "../../actions/playerActions";

const Player = ({
  player,
  isPlaying,
  previousSong,
  currentSong,
  nextSong,
  playlistSongsById,
  setVideoDuration,
  setProgress,
  setPercentage,
  isFullScreenActive,
}) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (player.isFullScreenActive === true) {
      if (screenfull.isEnabled) {
        screenfull.request(playerRef.current.wrapper.childNodes[0].children[0]);
      }
      isFullScreenActive(false);

      // screenfull.exit()
    }
  }, [player.isFullScreenActive]);
  useEffect(() => {
    if (playlistSongsById[player.currentActivePlaylistId]) {
      currentSong(
        playlistSongsById[player.currentActivePlaylistId][0]?.snippet.resourceId
          .videoId
      );
    }
  }, []);

  const afterSongEnds = () => {
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
    } else {
      previousSong(
        playlistSongsById[player.currentActivePlaylistId][currIndex]?.snippet
          .resourceId.videoId
      );
      currentSong(
        playlistSongsById[player.currentActivePlaylistId][currIndex + 1]
          ?.snippet.resourceId.videoId
      );
      nextSong("");
    }
  };

  const handleEnd = () => {
    if (
      playlistSongsById[player.currentActivePlaylistId].findIndex(
        (ele) => ele.snippet.resourceId.videoId === player.currentSong
      ) ===
      playlistSongsById[player.currentActivePlaylistId].length - 1
    ) {
      console.log("Playlist Ended");
      isPlaying(false);
    } else afterSongEnds();
  };
  // When some songs can't be played outside of youtube this function will trigger and playlist the next song, or if it is the last the playlist will end
  const handleError = () => {
    if (
      playlistSongsById[player.currentActivePlaylistId].findIndex(
        (ele) => ele.snippet.resourceId.videoId === player.currentSong
      ) ===
      playlistSongsById[player.currentActivePlaylistId].length - 1
    ) {
      console.log("Playlist Ended");
      isPlaisPlayingying(false);
    } else afterSongEnds();
  };

  const handlePlay = () => {
    isPlaying(true);
  };
  const handlePause = () => {
    isPlaying(false);
  };

  const handleReady = () => {
    isPlaying(true);
  };

  const handleProgress = (e) => {
    setProgress(String(Math.floor(e.playedSeconds)));
    getPercentage(String(e.playedSeconds), String(player.videoDuration));
  };
  const handleDuration = (e) => {
    setVideoDuration(String(e));
  };

  const getPercentage = (a, b) => {
    const trimmedA = Math.floor(a);
    const percentage = (trimmedA / b) * 100;
    setPercentage(String(Math.floor(percentage)));
  };
  return (
    <div className="player aspect-auto md:w-full md:h-full	">
      {/* https://img.youtube.com/vi/Eeb4aZObp-0/0.jpg*/}
      <ReactPlayer
        className="aaaa"
        ref={playerRef}
        //not working yet
        // fallback={`https://img.youtube.com/vi/${player.currentSong}.jpg`}
        valume={null}
        muted={player.isMutedActive}
        passive="true"
        onProgress={(e) => handleProgress(e)}
        onDuration={(e) => handleDuration(e)}
        onError={() => handleError()}
        onPlay={() => handlePlay()}
        onPause={() => handlePause()}
        onReady={() => handleReady()}
        onEnded={() => handleEnd()}
        width={"100%"}
        height={"100%"}
        controls={true}
        loop={player.isLoopActive}
        playing={player.isPlaying}
        url={`https://www.youtube.com/embed/${player.currentSong}`}
      />
    </div>
  );
};

Player.propTypes = {
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
  previousSong: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  nextSong: PropTypes.func,
  setPercentage: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.object.isRequired,
  setProgress: PropTypes.func.isRequired,
  setVideoDuration: PropTypes.func.isRequired,
  setPercentage: PropTypes.func.isRequired,
  isFullScreenActive: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  isPlaying: isPlaying,
  previousSong: previousSong,
  currentSong: currentSong,
  nextSong: nextSong,
  setProgress: setProgress,
  setVideoDuration: setVideoDuration,
  setPercentage: setPercentage,
  isFullScreenActive: isFullScreenActive,
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    playlistSongsById: state.playlistSongsById,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
