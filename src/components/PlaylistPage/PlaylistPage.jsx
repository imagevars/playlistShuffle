import React, { useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HelmetHelper from '../Helmet/HelmetHelper';
import VideoCard from './VideoCard/VideoCard';
import MediaButtons from './MediaButtons/MediaButtons';
import {
  isPlaying,
  isLoopActive,
  isShuffleActive,
  previousSong,
  currentSong,
  nextSong,
  isMutedActive,
} from '../../redux/actions/playerActions';
import { lastPlayedPlaylistDetails, lastPlayedPlaylistDetailsAll } from '../../redux/actions/playlistDetailsActions';
import PlayingRightNow from './PlayingRightNow/PlayingRightNow';
import Navbar from '../Navbar/Navbar';
import PlaylistInfo from './PlaylistInfo/PlaylistInfo';
import Player from './Player/Player';
import ProgressBar from './ProgressBar/ProgressBar';

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
  playlistDetails,
  lastPlayedPlaylistDetails,
  lastPlayedPlaylistDetailsAll,
}) {
  const { id } = useParams();

  if (player.currentActivePlaylistId !== id) {
    return <Navigate to="/error" />;
  }
  const ref = useRef(null);

  const findPlaylistIndex = playlistDetails.findIndex((element) => element.playlistId
  === player.currentActivePlaylistId);

  const currentVideoName = playlistSongsById[player.currentActivePlaylistId][
    playlistDetails[findPlaylistIndex].currentIndex
  ].snippet.title;

  useEffect(() => {
    if (player.rememberLastVideo === false) {
      lastPlayedPlaylistDetailsAll();
    }
  }, []);

  useEffect(() => {
    const findPlaylistIndex = playlistDetails.findIndex((element) => element.playlistId
    === player.currentActivePlaylistId);
    const currIndex = playlistDetails[findPlaylistIndex].currentIndex;
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
          if (currIndex > 0) {
            const lastPlayedObj = {
              currentIndex: playlistDetails[findPlaylistIndex].currentIndex - 1,
              playlistId: player.currentActivePlaylistId,
            };
            lastPlayedPlaylistDetails(lastPlayedObj);
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
          break;
        }
        case 'ArrowRight': {
          if (
            currIndex < playlistSongsById[player.currentActivePlaylistId].length - 1
          ) {
            const lastPlayedObj = {
              currentIndex: playlistDetails[findPlaylistIndex].currentIndex + 1,
              playlistId: player.currentActivePlaylistId,
            };
            lastPlayedPlaylistDetails(lastPlayedObj);
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
            playlistDetails[findPlaylistIndex].currentIndex
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
      className="min-h-screen bg-[#f2e7fe] w-full"
    >
      <div
        className="w-[95%] md:max-w-[2200px] mx-auto"
      >
        <HelmetHelper
          title={
            currentVideoName
              ? `${currentVideoName} - Playlist Shuffle`
              : 'Playlist Shuffle | randomize your playlist'
          }
        />
        <Navbar />

        <div className=" ">
          <PlaylistInfo />
        </div>

        <div className="div">
          <div className="mainContent md:flex md:h-[65vh]">
            <div className="md:w-3/5">
              <Player />
            </div>
            <div className=" h-3/5 md:h-full mt-6 w-[97%]  md:mt-0 mx-auto md:w-2/5">
              <VideoCard />
            </div>
          </div>
          <div className="bottomMedia bg-[#23036a] fixed bottom-0 left-0 right-0">
            <div className="md:flex md:justify-between py-2">

              <div className="md:w-1/4">
                <PlayingRightNow />
              </div>
              <div className="md:w-1/2">

                <div>
                  <div className="mediaButtonsContainer flex justify-center">
                    <MediaButtons />
                  </div>
                </div>
                <ProgressBar />
              </div>
              <div className="hidden md:flex md:w-1/4" />
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
    rememberLastVideo: PropTypes.bool.isRequired,
  }).isRequired,
  isLoopActive: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  previousSong: PropTypes.func.isRequired,
  nextSong: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  isMutedActive: PropTypes.func.isRequired,
  playlistDetails: PropTypes.arrayOf(PropTypes.shape({
    playlistName: PropTypes.string.isRequired,
    playlistId: PropTypes.string.isRequired,
    playlistImage: PropTypes.string.isRequired,
    playlistEtag: PropTypes.string.isRequired,
    currentIndex: PropTypes.number.isRequired,
  })).isRequired,
  lastPlayedPlaylistDetails: PropTypes.func.isRequired,
  lastPlayedPlaylistDetailsAll: PropTypes.func.isRequired,

};

const mapDispatchToProps = {
  isPlaying,
  isLoopActive,
  isShuffleActive,
  previousSong,
  currentSong,
  nextSong,
  isMutedActive,
  lastPlayedPlaylistDetails,
  lastPlayedPlaylistDetailsAll,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
