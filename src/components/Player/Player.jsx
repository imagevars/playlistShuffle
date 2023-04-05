import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AspectRatio } from "@chakra-ui/react";
import ReactPlayer from "react-player/youtube";

const Player = ({
  songs,
  player,
  isPlaying,
  previousSong,
  currentSong,
  nextSong,
  isLoopActive,
}) => {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // autoplay: 1,
      color: "red",
      modestbranding: 1,
    },
  };

  useEffect(() => {
    if (songs) {
      currentSong(songs[0]?.snippet.resourceId.videoId);
    }
  }, []);

  const afterSongEnds = () => {
    const currIndex = songs.findIndex((ele) => {
      return ele.snippet?.resourceId.videoId === player.currentSong;
    });
    if (currIndex < songs.length - 1) {
      previousSong(songs[currIndex]?.snippet.resourceId.videoId);
      currentSong(songs[currIndex + 1]?.snippet.resourceId.videoId);
      nextSong(songs[currIndex + 2]?.snippet.resourceId.videoId);
    } else {
      previousSong(songs[currIndex]?.snippet.resourceId.videoId);
      currentSong(songs[currIndex + 1]?.snippet.resourceId.videoId);
      nextSong("");
    }
  };

  const handleEnd = () => {
    console.log("ended");
    if (
      songs.findIndex(
        (ele) => ele.snippet.resourceId.videoId === player.currentSong
      ) ===
      songs.length - 1
    ) {
      console.log("Playlist Ended");
      isPlaying(false);
    } else afterSongEnds();
  };
  // When some songs cat be played outside of youtube this function will trigger and playlist the next song, or if it is the last the playlist will end
  const handleError = (e) => {
    console.log("error", e);
    if (
      songs.findIndex(
        (ele) => ele.snippet.resourceId.videoId === player.currentSong
      ) ===
      songs.length - 1
    ) {
      console.log("Playlist Ended");
      // isPlaying(false);
    } else afterSongEnds();
  };

  return (
    <AspectRatio minW={"100%"} maxH={"100%"} ratio={1} className="player">
      <ReactPlayer
        onError={handleError}
        onPlay={() => isPlaying(true)}
        onPause={() => isPlaying(false)}
        onReady={() => isPlaying(true)}
        onEnded={handleEnd}
        width={"100%"}
        height={"100%"}
        controls={true}
        loop={player.isLoopActive}
        playing={player.isPlaying}
        url={`https://www.youtube.com/watch?v=${player.currentSong}`}
      />
    </AspectRatio>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    isPlaying: (payload) => dispatch({ type: "player/isPlaying", payload }),
    previousSong: (payload) =>
      dispatch({ type: "player/previousSong", payload }),
    currentSong: (payload) => dispatch({ type: "player/currentSong", payload }),
    nextSong: (payload) => dispatch({ type: "player/nextSong", payload }),
  };
};

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    player: state.player,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
