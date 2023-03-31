import React, { useEffect } from "react";
import {
  MdPlayCircleOutline,
  MdPauseCircleOutline,
  MdOutlineShuffleOn,
  MdOutlineShuffle,
  MdOutlineSkipPrevious,
  MdOutlineSkipNext,
  MdSkipPrevious,
  MdSkipNext,
} from "react-icons/md";
import { connect } from "react-redux";

const MediaButtons = ({
  songs,
  player,
  isPlaying,
  isShuffleActive,
  previousSong,
  currentSong,
  nextSong,
  addSongs,
}) => {
  const playPauseButton = (e) => {
    isPlaying(e);
  };



  const handleClickPreviousButton = () => {
    const currIndex = songs.findIndex((song) => {
      return song.snippet.resourceId.videoId === player.currentSong;
    });
    if (currIndex !== 0) {
      previousSong(songs[currIndex - 2]?.snippet.resourceId.videoId);
      currentSong(songs[currIndex - 1]?.snippet.resourceId.videoId);
      nextSong(songs[currIndex]?.snippet.resourceId.videoId);
    }
  };
  const handleClickNextButton = () => {
    const currIndex = songs.findIndex((ele) => {
      return ele.snippet?.resourceId.videoId === player.currentSong;
    });

    if (currIndex < songs.length -1) {
      previousSong(songs[currIndex]?.snippet.resourceId.videoId);
      currentSong(songs[currIndex + 1]?.snippet.resourceId.videoId);
      nextSong(songs[currIndex + 2]?.snippet.resourceId.videoId);
    } else if (currIndex === songs.length -1){
      // previousSong(songs[currIndex]?.snippet.resourceId.videoId);
      // currentSong(songs[currIndex + 1]?.snippet.resourceId.videoId);
      // nextSong('');

    }
  };

  const handleClickShuffle =  () => {
    if (player.isShuffleActive === false) {
      isShuffleActive(true);
    } else {
      isShuffleActive(false);
      let unShuffleArr = [];
      unShuffleArr.push(...songs);
      unShuffleArr.sort(function (a, b) {
        return a.snippet.position - b.snippet.position;
      });
      addSongs(unShuffleArr);
      currentSong(unShuffleArr[0].snippet.resourceId.videoId);
      nextSong(unShuffleArr[1].snippet.resourceId.videoId);
    }
  };
  return (
      <div className="mediaButtons ">
        <MdOutlineSkipPrevious onClick={handleClickPreviousButton} />
        {/* <MdSkipPrevious /> */}
        {player.isPlaying === true ? (
          <MdPauseCircleOutline
            className="   "
            onClick={() => playPauseButton(false)}
          />
        ) : (
          <MdPlayCircleOutline
            className=" "
            onClick={() => playPauseButton(true)}
          />
        )}
        <MdOutlineSkipNext onClick={handleClickNextButton} />
        {/* <MdSkipNext /> */}
        {player.isShuffleActive ? (
          <MdOutlineShuffleOn
            className=""
            onClick={handleClickShuffle}
          />
        ) : (
          <MdOutlineShuffle
            className=" "
            onClick={handleClickShuffle}
          />
        )}
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    songs: state.songs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isPlaying: (payload) => dispatch({ type: "player/isPlaying", payload }),
    isShuffleActive: (payload) =>
      dispatch({ type: "player/isShuffleActive", payload }),
    isShuffleLoading: (payload) =>
      dispatch({ type: "player/isShuffleLoading", payload }),
    previousSong: (payload) =>
      dispatch({ type: "player/previousSong", payload }),
    currentSong: (payload) => dispatch({ type: "player/currentSong", payload }),
    nextSong: (payload) => dispatch({ type: "player/nextSong", payload }),
    addSongs: (payload) => dispatch({ type: "songs/addSongs", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaButtons);
