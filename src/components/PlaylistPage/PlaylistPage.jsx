import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VideoCard from '../VideoCard/VideoCard';
import MediaButtons from '../MediaButtons/MediaButtons';
import {
  isPlaying,
  isLoopActive,
  isShuffleActive,
  previousSong,
  currentSong,
  nextSong,
  isMutedActive,
} from '../../redux/actions/playerActions';

import PlayingRightNow from '../PlayingRightNow/PlayingRightNow';
import Navbar from '../Navbar/Navbar';
import PlaylistInfo from '../PlaylistInfo/PlaylistInfo';
// import { useParams } from "react-router-dom";
import HelmetHelper from '../Helmet/HelmetHelper';
import Player from '../Player/Player';
import ProgressBar from '../ProgressBar/ProgressBar';

function PlaylistPage({
  isPlaying,
  player,
  isLoopActive,
  isShuffleActive,
  currentSong,
  previousSong,
  nextSong,
  playlistSongsById,
  isMutedActive,
}) {
  const [currentSongName, setCurrentSongName] = useState('');
  // const { id } = useParams();
  const ref = useRef(null);

  useEffect(() => {
    const songIndex = playlistSongsById[
      player.currentActivePlaylistId
    ].findIndex((song) => song.snippet.resourceId.videoId === player.currentSong);
    setCurrentSongName(
      playlistSongsById[player.currentActivePlaylistId][songIndex].snippet.title,
    );
  }, [player.currentSong]);

  useEffect(() => {
    const handleClick = (e) => {
      switch (e.code) {
        case 'Space': {
          isPlaying(player.isPlaying !== true);
          break;
        }
        case 'KeyR': {
          isLoopActive(player.isLoopActive !== true);
          break;
        }
        case 'KeyS': {
          isShuffleActive(player.isShuffleActive !== true);
          break;
        }
        case 'KeyM': {
          isMutedActive(player.isMutedActive !== true);
          break;
        }
        case 'ArrowLeft': {
          const currIndex = playlistSongsById[
            player.currentActivePlaylistId
          ].findIndex((song) => song.snippet.resourceId.videoId === player.currentSong);
          if (currIndex !== 0) {
            previousSong(
              playlistSongsById[player.currentActivePlaylistId][currIndex - 2]
                ?.snippet.resourceId.videoId,
            );

            nextSong(
              playlistSongsById[player.currentActivePlaylistId][currIndex]
                ?.snippet.resourceId.videoId,
            );
            currentSong(
              playlistSongsById[player.currentActivePlaylistId][currIndex - 1]
                ?.snippet.resourceId.videoId,
            );
          }
          break;
        }
        case 'ArrowRight': {
          const currIndex = playlistSongsById[
            player.currentActivePlaylistId
          ].findIndex((ele) => ele.snippet?.resourceId.videoId === player.currentSong);

          if (
            currIndex
            < playlistSongsById[player.currentActivePlaylistId].length - 1
          ) {
            previousSong(
              playlistSongsById[player.currentActivePlaylistId][currIndex]
                ?.snippet.resourceId.videoId,
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
          break;
        }
        default: break;
      }
    };

    const element = ref.current;

    element.addEventListener('keydown', handleClick, { passive: true });

    return () => {
      element.removeEventListener('keydown', handleClick, { passive: true });
    };
  }, [player]);

  return (
    <div
      ref={ref}
      // eslint-disable-next-line
      tabIndex={0}
      // passive="true"
      className="min-h-screen bg-[#121212] w-full"
    >
      <div
        className="w-[95%] md:max-w-[2200px] mx-auto
      "
      >
        <HelmetHelper
          title={
            currentSongName
              ? `${currentSongName} - Playlist Shuffle`
              : 'Playlist Shuffle | randomize your playlist'
          }
        />
        <Navbar />

        <div className=" ">
          <PlaylistInfo />
        </div>

        <div className="div">
          <div className="mainContent md:flex md:h-[65vh]">
            <div className="md:w-2/5">
              <Player />
            </div>
            <div className=" h-3/5 md:h-full mt-6 w-[97%]  md:mt-0 mx-auto md:w-[55%]">
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
}

PlaylistPage.propTypes = {
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
  nextSong: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  isMutedActive: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  isPlaying,
  isLoopActive,
  isShuffleActive,
  previousSong,
  currentSong,
  nextSong,
  isMutedActive,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
