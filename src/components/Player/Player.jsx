import React, { useEffect } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";

import {
  isPlaying,
  previousSong,
  nextSong,
  currentSong,
} from "../../actions/playerActions";

const Player = ({
  player,
  isPlaying,
  previousSong,
  currentSong,
  nextSong,
  playlistSongsById,
}) => {
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

  return (
    <div className="player aspect-auto lg:w-full lg:h-full	">
      {/* https://img.youtube.com/vi/Eeb4aZObp-0/0.jpg
DEFER LOADING UPPP */}
      <ReactPlayer
        //not working yet
        // fallback={`https://img.youtube.com/vi/${player.currentSong}.jpg`}
        valume={null}
        muted={player.isMutedActive}
        passive="true"
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
  playlistSongsById: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  isPlaying: isPlaying,
  previousSong: previousSong,
  currentSong: currentSong,
  nextSong: nextSong,
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    playlistSongsById: state.playlistSongsById,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
