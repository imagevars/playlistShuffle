import React, { useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HelmetHelper from '../Helmet/HelmetHelper';
import List from './VideoCard/List';
import useDocumentVisibility from '../../hooks/visibility';
import MediaButtons from './MediaButtons/MediaButtons';
import {
  isPlaying,
  isLoopActive,
  isShuffleActive,
  currentSong,
  isMutedActive,
  setVolume,
  setSeekKeyboard,
  setCurrentActivePlaylistId,
  setWordsToSearch,
  setProgress,
  setSeekTo,
  setPercentage,
} from '../../redux/actions/playerActions';
import setSearchInput from '../../redux/actions/homepageActions';
import {
  lastPlayedIndexPlaylistDetails,
  setPlaylistImage,
} from '../../redux/actions/playlistDetailsActions';
import PlayingRightNow from './PlayingRightNow/PlayingRightNow';
import Navbar from '../Navbar/Navbar';
import PlaylistInfo from './PlaylistInfo/PlaylistInfo';
import Player from './Player/Player';
import ProgressBar from './ProgressBar/ProgressBar';
import VolumeManger from './MediaButtons/VolumeManager';
import SearchSongs from './SearchSongs/SearchSongs';

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
  setSeekKeyboard,
  setCurrentActivePlaylistId,
  setPlaylistImage,
  setSearchInput,
  setWordsToSearch,
  setProgress,
  setSeekTo,
  setPercentage,
}) {
  const { id } = useParams();
  let findPlaylistIndex = playlistDetails.findIndex(
    (element) => element.playlistId === player.currentActivePlaylistId,
  );
  useEffect(() => {
    setWordsToSearch('');
  }, []);
  const isDocumentVisible = useDocumentVisibility();

  if (player.currentActivePlaylistId !== id) {
    const doesPlExist = playlistDetails.findIndex(
      (element) => element.playlistId === id,
    );
    if (doesPlExist !== -1) {
      setCurrentActivePlaylistId(id);
      findPlaylistIndex = doesPlExist;
      currentSong(
        playlistSongsById[id][playlistDetails[findPlaylistIndex].currentIndex]
          .snippet.resourceId.videoId,
      );
    } else {
      setSearchInput(id);
      return <Navigate to="/" />;
    }
  }
  const ref = useRef(null);

  const currentVideoName =
    playlistSongsById[player.currentActivePlaylistId][
      playlistDetails[findPlaylistIndex].currentIndex
    ].snippet.title;

  useEffect(() => {
    const findPlaylistIndex = playlistDetails.findIndex(
      (element) => element.playlistId === player.currentActivePlaylistId,
    );
    const currIndex = playlistDetails[findPlaylistIndex].currentIndex;
    const handleClick = (e) => {
      if (e.target.nodeName.toLowerCase() !== 'input') {
        if (e.ctrlKey && e.code === 'ArrowLeft' ) {
          if (player.progress > 5) {
            const backwardTo = (player.progress - 5) / player.videoDuration
            setProgress(Math.ceil(backwardTo * player.videoDuration));
            setSeekTo(parseFloat(backwardTo));
            setPercentage(
              parseInt(
                (Math.ceil(backwardTo * player.videoDuration) /
                  player.videoDuration) *
                  100,
                10,
              )
            );

          }
          return;
        }
        if (e.ctrlKey && e.code === 'ArrowRight') {
          if (player.videoDuration - player.progress > 5) {
            const forwardTo = (player.progress + 5) / player.videoDuration
            setProgress(Math.ceil(forwardTo * player.videoDuration));
            setSeekTo(parseFloat(forwardTo));
            setPercentage(
              parseInt(
                (Math.ceil(forwardTo * player.videoDuration) /
                  player.videoDuration) *
                  100,
                10,
              )
            );
            
          }
          return;
        }
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
            if (player.volume - 0.05 > 0.006) {
              setVolume(player.volume - 0.05);
            } else {
              isMutedActive(true);
              setVolume(0);
            }
            break;
          }
          case 'ArrowLeft': {
            if (currIndex > 0) {
              const lastPlayedObj = {
                currentIndex:
                  playlistDetails[findPlaylistIndex].currentIndex - 1,
                playlistId: player.currentActivePlaylistId,
              };
              lastPlayedIndexPlaylistDetails(lastPlayedObj);
              currentSong(
                playlistSongsById[player.currentActivePlaylistId][currIndex - 1]
                  ?.snippet.resourceId.videoId,
              );
              const obj = {
                playlistId: player.currentActivePlaylistId,
                playlistImage: `https://i.ytimg.com/vi/${
                  playlistSongsById[player.currentActivePlaylistId][
                    currIndex - 1
                  ]?.snippet.resourceId.videoId
                }/mqdefault.jpg`,
              };
              setPlaylistImage(obj);
            }
            break;
          }
          case 'ArrowRight': {
            if (
              currIndex <
              playlistSongsById[player.currentActivePlaylistId].length - 1
            ) {
              const lastPlayedObj = {
                currentIndex:
                  playlistDetails[findPlaylistIndex].currentIndex + 1,
                playlistId: player.currentActivePlaylistId,
              };
              lastPlayedIndexPlaylistDetails(lastPlayedObj);
              currentSong(
                playlistSongsById[player.currentActivePlaylistId][currIndex + 1]
                  ?.snippet.resourceId.videoId,
              );
              const obj = {
                playlistId: player.currentActivePlaylistId,
                playlistImage: `https://i.ytimg.com/vi/${
                  playlistSongsById[player.currentActivePlaylistId][
                    currIndex + 1
                  ]?.snippet.resourceId.videoId
                }/mqdefault.jpg`,
              };
              setPlaylistImage(obj);
            } else if (
              playlistDetails[findPlaylistIndex].currentIndex ===
              playlistSongsById[player.currentActivePlaylistId].length - 1
            ) {
              // empty
            }
            break;
          }
          case 'Numpad0': {
            setSeekKeyboard(0);
            break;
          }
          case 'Numpad1': {
            setSeekKeyboard(0.1);
            break;
          }
          case 'Numpad2': {
            setSeekKeyboard(0.2);
            break;
          }
          case 'Numpad3': {
            setSeekKeyboard(0.3);
            break;
          }
          case 'Numpad4': {
            setSeekKeyboard(0.4);
            break;
          }
          case 'Numpad5': {
            setSeekKeyboard(0.5);
            break;
          }
          case 'Numpad6': {
            setSeekKeyboard(0.6);
            break;
          }
          case 'Numpad7': {
            setSeekKeyboard(0.7);
            break;
          }
          case 'Numpad8': {
            setSeekKeyboard(0.8);
            break;
          }
          case 'Numpad9': {
            setSeekKeyboard(0.9);
            break;
          }
          case 'Digit0': {
            setSeekKeyboard(0);
            break;
          }
          case 'Digit1': {
            setSeekKeyboard(0.1);
            break;
          }
          case 'Digit2': {
            setSeekKeyboard(0.2);
            break;
          }
          case 'Digit3': {
            setSeekKeyboard(0.3);
            break;
          }
          case 'Digit4': {
            setSeekKeyboard(0.4);
            break;
          }
          case 'Digit5': {
            setSeekKeyboard(0.5);
            break;
          }
          case 'Digit6': {
            setSeekKeyboard(0.6);
            break;
          }
          case 'Digit7': {
            setSeekKeyboard(0.7);
            break;
          }
          case 'Digit8': {
            setSeekKeyboard(0.8);
            break;
          }
          case 'Digit9': {
            setSeekKeyboard(0.9);
            break;
          }
          default:
            break;
        }
      }
    };

    const element = ref.current;
    if (
      (document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.id !== 'widget2') ||
      isDocumentVisible === false
    ) {
      element.focus();
    }
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
      className="h-screen min-h-screen transition-colors bg-backColor image:bg-[unset] focus:outline-none "
    >
      <HelmetHelper
        percentage={player.videoPercentage}
        title={
          currentVideoName
            ? `${currentVideoName} - Playlist Shuffle`
            : 'Playlist Shuffle | randomize your playlist'
        }
      />
      <div className=" h-full flex flex-col overflow-hidden  md:block  items-center md:mx-auto">
        <Navbar />

        <div className="h-1/5  w-full  md:float-left md:w-3/5 md:h-[70%]">
          <PlaylistInfo />
          <Player />
        </div>
        <div className="w-10/12 h-full  mt-12 md:mt-8 mb-2    md:float-right md:w-2/5  md:h-[69%] flex flex-col ">
          <SearchSongs />
          <List />
        </div>
        <div className="w-11/12  md:w-full md:clear-both md:absolute md:bottom-0 md:flex md:left-0 md:right-0">
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
    theme: PropTypes.string.isRequired,
    videoPercentage: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    videoDuration: PropTypes.number.isRequired,
  }).isRequired,

  isLoopActive: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  isMutedActive: PropTypes.func.isRequired,
  playlistDetails: PropTypes.arrayOf(
    PropTypes.shape({
      playlistName: PropTypes.string.isRequired,
      playlistId: PropTypes.string.isRequired,
      playlistImage: PropTypes.string.isRequired,
      playlistEtag: PropTypes.string.isRequired,
      currentIndex: PropTypes.number.isRequired,
    }),
  ).isRequired,

  lastPlayedIndexPlaylistDetails: PropTypes.func.isRequired,
  setVolume: PropTypes.func.isRequired,
  setSeekKeyboard: PropTypes.func.isRequired,
  setCurrentActivePlaylistId: PropTypes.func.isRequired,
  setPlaylistImage: PropTypes.func.isRequired,
  setSearchInput: PropTypes.func.isRequired,
  setWordsToSearch: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
  setSeekTo: PropTypes.func.isRequired,
  setPercentage: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  isPlaying,
  isLoopActive,
  isShuffleActive,
  currentSong,
  isMutedActive,
  lastPlayedIndexPlaylistDetails,
  setVolume,
  setSeekKeyboard,
  setCurrentActivePlaylistId,
  setPlaylistImage,
  setSearchInput,
  setWordsToSearch,
  setProgress,
  setSeekTo,
  setPercentage,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
