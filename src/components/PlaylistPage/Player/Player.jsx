import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";
import {
  isPlaying,
  currentSong,
  setProgress,
  setVideoDuration,
  setPercentage,
  setSeeking,
  setArtist,
  setTitle,
  setSeekKeyboard,
  setSeekTo,
} from "../../../redux/actions/playerActions";
import {
  lastPlayedIndexPlaylistDetails,
  setPlaylistImage,
} from "../../../redux/actions/playlistDetailsActions";

function Player({
  player,
  isPlaying,
  currentSong,
  playlistSongsById,
  setVideoDuration,
  setProgress,
  setPercentage,
  playlistDetails,
  setArtist,
  setTitle,
  lastPlayedIndexPlaylistDetails,
  setPlaylistImage,
  setSeekKeyboard,
  setSeekTo,
}) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (player.seekKeyboard !== null) {
      playerRef.current.seekTo(player.seekKeyboard, "fraction");
    }
    setSeekKeyboard(null);
  }, [player.seekKeyboard]);

  const findPlaylistIndex = playlistDetails.findIndex(
    (element) => element.playlistId === player.currentActivePlaylistId,
  );

  const afterSongEnds = () => {
    const currIndex = playlistDetails[findPlaylistIndex].currentIndex;
    if (
      playlistDetails[findPlaylistIndex].currentIndex <
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
    } else if (
      playlistDetails[findPlaylistIndex].currentIndex ===
      playlistSongsById[player.currentActivePlaylistId].length - 1
    ) {
      // empty
    }
  };

  const handleEnd = () => {
    if (
      playlistDetails[findPlaylistIndex].currentIndex ===
      playlistSongsById[player.currentActivePlaylistId].length
    ) {
      // empty
      isPlaying(false);
    } else {
      afterSongEnds();
    }
  };
  // When some songs can't be played outside of youtube this function will trigger
  // and playlist the next song, or if it is the last the playlist will end
  const handleError = () => {
    const currIndex = playlistDetails[findPlaylistIndex].currentIndex;
    if (currIndex === playlistDetails[findPlaylistIndex].playlistLength) {
      isPlaying(false);
    } else afterSongEnds();
  };

  useEffect(() => {
    if (player.seeking === true && player.seekTo !== null) {
      playerRef.current.seekTo(player.seekTo);
      setSeeking(false);
      setSeekTo(null);
    }
  }, [player.seekTo]);

  const handlePlay = () => {
    isPlaying(true);
  };
  const handlePause = () => {
    isPlaying(false);
  };

  const getTitleAndArtist = (title, ownerTitle) => {
    try {
      const joinedTitleAndOwnerTitle = [title, ownerTitle];
      if (title === "Private video") {
        return title;
      }
      if (joinedTitleAndOwnerTitle[0].includes(" - ")) {
        const regex = /^(.*?)-(.*)$/;
        const match = joinedTitleAndOwnerTitle[0].match(regex);

        const [, artist, title] = match;

        return [title, artist];
      }
      if (joinedTitleAndOwnerTitle[0].includes("//")) {
        const regex = /^(.*?)\s\/\/\s(.*)$/;
        const match = joinedTitleAndOwnerTitle[0].match(regex);

        const [, artist, title] = match;

        return [title, artist];
      }
      if (joinedTitleAndOwnerTitle[1].includes(" - Topic")) {
        const regex = /^(.*?)\s-\sTopic$/;
        const match = joinedTitleAndOwnerTitle[1].match(regex);
        const artist = match[1];
        return [title, artist];
      }
      return [title, ownerTitle];
    } catch (error) {
      return title;
    }
  };

  const handleReady = () => {
    const [title, artist] = getTitleAndArtist(
      playlistSongsById[player.currentActivePlaylistId][
        playlistDetails[findPlaylistIndex].currentIndex
      ].snippet.title,
      playlistSongsById[player.currentActivePlaylistId][
        playlistDetails[findPlaylistIndex].currentIndex
      ].snippet.videoOwnerChannelTitle,
    );
    setTitle(
      `${playlistDetails[findPlaylistIndex].currentIndex + 1} - ${title}`,
    );
    setArtist(artist);
    setProgress(0);
    setVideoDuration(playerRef.current.getDuration());
    isPlaying(true);
    const obj = {
      playlistId: player.currentActivePlaylistId,
      playlistImage: `https://i.ytimg.com/vi/${player.currentSong}/mqdefault.jpg`,
    };
    setPlaylistImage(obj);
  };
  const getPercentage = (a, b) => {
    const trimmedA = Math.floor(a);
    const percentage = (trimmedA / b) * 100;
    setPercentage(Math.floor(percentage));
  };

  const handleProgress = (e) => {
    setProgress(Math.floor(e.playedSeconds));
    getPercentage(e.playedSeconds, player.videoDuration);
  };

  return (
    <div className="player h-full aspect-auto md:w-full md:mx-2 md:h-full">
      <ReactPlayer
        playing={player.isPlaying}
        ref={playerRef}
        muted={player.isMutedActive}
        passive="true"
        onProgress={(e) => handleProgress(e)}
        onError={() => handleError()}
        onPlay={() => handlePlay()}
        onPause={() => handlePause()}
        light
        config={{
          youtube: {
            playerVars: {
              color: "white",
            },
          },
        }}
        onReady={() => handleReady()}
        onEnded={() => handleEnd()}
        volume={player.volume}
        width="100%"
        height="100%"
        controls
        loop={player.isLoopActive}
        url={`https://www.youtube.com/embed/${player.currentSong}`}
      />
    </div>
  );
}

Player.propTypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    currentSong: PropTypes.string.isRequired,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
    videoDuration: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    seeking: PropTypes.bool.isRequired,
    seekTo: PropTypes.number,
    title: PropTypes.string.isRequired,
    seekKeyboard: PropTypes.number,
  }).isRequired,
  playlistDetails: PropTypes.arrayOf(
    PropTypes.shape({
      playlistName: PropTypes.string.isRequired,
      playlistId: PropTypes.string.isRequired,
      playlistImage: PropTypes.string.isRequired,
      playlistEtag: PropTypes.string.isRequired,
      currentIndex: PropTypes.number.isRequired,
      playlistLength: PropTypes.number,
    }),
  ).isRequired,
  isPlaying: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  setPercentage: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  setProgress: PropTypes.func.isRequired,
  setVideoDuration: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setArtist: PropTypes.func.isRequired,
  lastPlayedIndexPlaylistDetails: PropTypes.func.isRequired,
  setPlaylistImage: PropTypes.func.isRequired,
  setSeekKeyboard: PropTypes.func.isRequired,
  setSeekTo: PropTypes.func,
};

Player.defaultProps = {
  setSeekTo: null,
};

const mapDispatchToProps = {
  isPlaying,
  currentSong,
  setProgress,
  setVideoDuration,
  setPercentage,
  lastPlayedIndexPlaylistDetails,
  setTitle,
  setArtist,
  setPlaylistImage,
  setSeekKeyboard,
  setSeekTo,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
