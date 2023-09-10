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
  currentSong,
  isMutedActive,
  setVolume,
} from '../../redux/actions/playerActions';
import { lastPlayedIndexPlaylistDetails } from '../../redux/actions/playlistDetailsActions';
import PlayingRightNow from './PlayingRightNow/PlayingRightNow';
import Navbar from '../Navbar/Navbar';
import PlaylistInfo from './PlaylistInfo/PlaylistInfo';
import Player from './Player/Player';
import ProgressBar from './ProgressBar/ProgressBar';
import VolumeManger from './MediaButtons/VolumeManager';

function PlaylistPage({
  isPlaying,
  player,
  isLoopActive,
  isShuffleActive,
  currentSong,
  playlistSongsById,
  isMutedActive,
  playlistDetails,
  lastPlayedIndexPlaylistDetails,
  setVolume,
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
        case 'ArrowUp': {
          if (player.volume + 0.05 <= 1) {
            setVolume(player.volume + 0.05);
          } else {
            setVolume(1);
          }
          isMutedActive(false);
          break;
        }
        case 'ArrowDown': {
          if (player.volume - 0.05 >= 0) {
            setVolume(player.volume - 0.05);
          } else {
            setVolume(0);
          }
          isMutedActive(false);
          break;
        }
        case 'ArrowLeft': {
          if (currIndex > 0) {
            const lastPlayedObj = {
              currentIndex: playlistDetails[findPlaylistIndex].currentIndex - 1,
              playlistId: player.currentActivePlaylistId,
            };
            lastPlayedIndexPlaylistDetails(lastPlayedObj);
            currentSong(
              playlistSongsById[player.currentActivePlaylistId][currIndex - 1]
                ?.snippet.resourceId.videoId,
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
            lastPlayedIndexPlaylistDetails(lastPlayedObj);
            currentSong(
              playlistSongsById[player.currentActivePlaylistId][currIndex + 1]
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
      className="h-screen min-h-screen bg-bgWhite dark:bg-bgBlack w-full"
    >
      <div
        className=" h-full flex flex-col  md:block  md:max-w-[2200px] items-center"
      >
        <HelmetHelper
          title={
            currentVideoName
              ? `${currentVideoName} - Playlist Shuffle`
              : 'Playlist Shuffle | randomize your playlist'
          }
        />
        <Navbar />

        <div className="h-1/5 mb-2 w-full  md:float-left md:w-3/5 md:h-[68%] md:flex-shrink">
          <PlaylistInfo />
          <Player />
        </div>
        <div className="w-10/12  overflow-auto mt-9 md:float-right md:w-2/5  md:h-[68%] md:flex-shrink">
          <VideoCard />
        </div>
        <div className="w-11/12  md:w-full md:clear-both md:absolute md:bottom-0 md:flex">
          <PlayingRightNow />
          <div className="md:w-2/4">
            <ProgressBar />
            <MediaButtons />
          </div>
          <VolumeManger />
        </div>
      </div>
    </div>
  );
}

PlaylistPage.propTypes = {
  isPlaying: PropTypes.func.isRequired,
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    currentSong: PropTypes.string.isRequired,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
  }).isRequired,
  isLoopActive: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  isMutedActive: PropTypes.func.isRequired,
  playlistDetails: PropTypes.arrayOf(PropTypes.shape({
    playlistName: PropTypes.string.isRequired,
    playlistId: PropTypes.string.isRequired,
    playlistImage: PropTypes.string.isRequired,
    playlistEtag: PropTypes.string.isRequired,
    currentIndex: PropTypes.number.isRequired,
  })).isRequired,
  lastPlayedIndexPlaylistDetails: PropTypes.func.isRequired,
  setVolume: PropTypes.func.isRequired,

};

const mapDispatchToProps = {
  isPlaying,
  isLoopActive,
  isShuffleActive,
  currentSong,
  isMutedActive,
  lastPlayedIndexPlaylistDetails,
  setVolume,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
