import React, { useEffect, useRef, useState } from "react";
import VideoCard from "../VideoCard/VideoCard";
import MediaButtons from "../MediaButtons/MediaButtons";
import PropTypes from "prop-types";
import {
  isPlaying,
  isLoopActive,
  isShuffleActive,
  previousSong,
  currentSong,
  nextSong,
  isMutedActive,
} from "../../actions/playerActions";

import PlayingRightNow from "../PlayingRightNow/PlayingRightNow";
import Navbar from "../Navbar/Navbar";
import PlaylistInfo from "../PlaylistInfo/PlaylistInfo";
import { connect } from "react-redux";
// import { useParams } from "react-router-dom";
import HelmetHelper from "../Helmet/HelmetHelper";
import Player from "../Player/Player";
import ProgressBar from "../ProgressBar/ProgressBar";
const PlaylistPage = ({
  isPlaying,
  player,
  isLoopActive,
  isShuffleActive,
  currentSong,
  previousSong,
  nextSong,
  playlistSongsById,
  isMutedActive,
}) => {
  const [currentSongName, setCurrentSongName] = useState("");
  // const { id } = useParams();
  const ref = useRef(null);

  useEffect(() => {
    const songIndex = playlistSongsById[
      player.currentActivePlaylistId
    ].findIndex((song) => {
      return song.snippet.resourceId.videoId === player.currentSong;
    });
    setCurrentSongName(
      playlistSongsById[player.currentActivePlaylistId][songIndex].snippet.title
    );
  }, [player.currentSong]);

  useEffect(() => {
    const handleClick = (e) => {
      switch (e.code) {
        case "Space": {
          isPlaying(player.isPlaying === true ? false : true);
          break;
        }
        case "KeyR": {
          isLoopActive(player.isLoopActive === true ? false : true);
          break;
        }
        case "KeyS": {
          isShuffleActive(player.isShuffleActive === true ? false : true);
          break;
        }
        case "KeyM": {
          isMutedActive(player.isMutedActive === true ? false : true);
          break;
        }
        case "ArrowLeft": {
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

            nextSong(
              playlistSongsById[player.currentActivePlaylistId][currIndex]
                ?.snippet.resourceId.videoId
            );
            currentSong(
              playlistSongsById[player.currentActivePlaylistId][currIndex - 1]
                ?.snippet.resourceId.videoId
            );
          }
          break;
        }
        case "ArrowRight": {
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
              playlistSongsById[player.currentActivePlaylistId][currIndex]
                ?.snippet.resourceId.videoId
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
          break;
        }
      }
    };

    const element = ref.current;

    element.addEventListener("keydown", handleClick, { passive: true });

    return () => {
      element.removeEventListener("keydown", handleClick, { passive: true });
    };
  }, [player]);

  return (
    <div
      ref={ref}
      tabIndex={0}
      passive="true"
      className="min-h-screen bg-[#121212] w-full"
    >
      <div
        className="w-[95%] lg:max-w-[2200px] mx-auto 
      "
      >
        <HelmetHelper
          title={
            currentSongName
              ? `${currentSongName} - Playlist Shuffle`
              : "Paylist Shuffle | randomize your playlist"
          }
        />
        <Navbar />

        <div className=" ">
          <PlaylistInfo />
        </div>

        <div className="div">
          <div className="mainContent lg:flex">
            <div className="lg:w-2/5">
              <Player />
            </div>
            <div className=" h-3/5 mt-6 w-[97%]  lg:mt-0 mx-auto lg:w-[55%]">
              <VideoCard />
            </div>
          </div>
          <div className="bottomMedia bg-[#bb86fc] fixed bottom-0 left-0 right-0">
            <div>
              <PlayingRightNow />
            </div>
            <div>
              <ProgressBar />
            </div>
            <div className="mediaButtonsContainer flex justify-center">
              <MediaButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PlaylistPage.proptypes = {
  isPlaying: PropTypes.func.isRequired,
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
  isLoopActive: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  previousSong: PropTypes.func.isRequired,
  nextSong: PropTypes.func,
  playlistSongsById: PropTypes.object.isRequired,
  isMutedActive: PropTypes.func.isRequired,
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

const mapStateToProps = (state) => {
  return {
    player: state.player,
    playlistSongsById: state.playlistSongsById,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
