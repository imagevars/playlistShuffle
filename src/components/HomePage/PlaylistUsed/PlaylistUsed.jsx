import React from 'react';
import { TbArrowsSort } from 'react-icons/tb';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdUpdate } from 'react-icons/md';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  addToPlaylistDetails,
  deleteFromPlaylistDetails,
  modifyEtagInPlaylistDetailsById,
  lastPlayedIndexPlaylistDetails,
} from '../../../redux/actions/playlistDetailsActions';
import setIsHasPlaylistLoading from '../../../redux/actions/isPlaylistLoadingActions';
import fetchPlaylistVideos from '../../utils/fetchPlaylistVideos';
import fetchPlaylistData from '../../utils/fetchPlaylistData';
import {
  addSongsByPlaylistID,
  removePlaylistSongsById,
} from '../../../redux/actions/playlistSongsByIdActions';
import {
  setCurrentActivePlaylistId,
  currentSong,
  isShuffleActive,
} from '../../../redux/actions/playerActions';

function PlaylistUsed({
  playlistDetails,
  addToPlaylistDetails,
  deleteFromPlaylistDetails,
  addSongsByPlaylistID,
  setCurrentActivePlaylistId,
  removePlaylistSongsById,
  currentSong,
  modifyEtagInPlaylistDetailsById,
  isShuffleActive,
  playlistSongsById,
  lastPlayedIndexPlaylistDetails,
  setIsHasPlaylistLoading,
}) {
  const navigate = useNavigate();

  const handleClickPlaylist = async (id) => {
    isShuffleActive(false);
    setCurrentActivePlaylistId(id);

    setIsHasPlaylistLoading(true);
    const findPlaylistIndex = playlistDetails.findIndex((element) => element.playlistId === id);

    currentSong(
      playlistSongsById[id][playlistDetails[findPlaylistIndex].currentIndex]
        .snippet.resourceId.videoId,
    );
    navigate(`/${id}`);
    setIsHasPlaylistLoading(false);
  };

  const handleDeleteFromPlaylist = (id) => {
    removePlaylistSongsById(id);
    deleteFromPlaylistDetails(id);
  };

  const handleSortClick = async (id) => {
    const unShuffleArr = [];
    unShuffleArr.push(...playlistSongsById[id]);
    unShuffleArr.sort((a, b) => {
      const result = a.snippet.position - b.snippet.position;
      return result;
    });
    const playlistObject = {
      id,
      songs: unShuffleArr,
    };
    addSongsByPlaylistID(playlistObject);
    currentSong(unShuffleArr[0].snippet.resourceId.videoId);
    const lastPlayedObj = {
      currentIndex: 0,
      playlistId: id,
    };
    lastPlayedIndexPlaylistDetails(lastPlayedObj);
    isShuffleActive(false);
  };

  const handleUpdate = async (id) => {
    setIsHasPlaylistLoading(true);
    setCurrentActivePlaylistId(id);
    const currentPlaylistInfo = playlistDetails.filter((element) => element.playlistId === id);

    const data = await fetchPlaylistVideos(
      id,
      currentPlaylistInfo[0].playlistEtag,
    );
    if (data === 304) {
      console.log('The playlist is still the same');
    } else {
      console.log('The playlist was updated');
      const playlistObject = {
        id,
        songs: data.responseArrToAdd,
      };

      const playlistDataInfo = await fetchPlaylistData(id, data.playlistEtag);
      const playlistEtagAndId = {
        playlistId: id,
        etag: data.playlistEtag,
      };
      addToPlaylistDetails(playlistDataInfo);
      modifyEtagInPlaylistDetailsById(playlistEtagAndId);
      addSongsByPlaylistID(playlistObject);
      currentSong(data.currentSong);
      const lastPlayedObj = {
        currentIndex: 0,
        playlistId: id,
      };
      lastPlayedIndexPlaylistDetails(lastPlayedObj);
    }
    setIsHasPlaylistLoading(false);
  };

  const playlists = playlistDetails.map((element) => (
    <div
      className="playlistUsedList cursor-pointer  my-2 mx-2 rounded-lg bg-primaryColor dark:bg-primaryColorDarkMode flex   "
      key={element.playlistId}
    >
      <button
        type="button"
        className="flex w-4/6"
        onClick={() => handleClickPlaylist(element.playlistId)}
      >
        <img
          className="object-cover  h-14 rounded-l-lg"
          width="56px"
          alt={`${element.playlistName}`}
          src={element.playlistImage}
        />
        <p className="usedPlaylistName ml-2 text-sm md:text-base font-open text-bgWhite dark:text-bgBlack font-medium truncate ">
          {element.playlistName}
        </p>
      </button>
      <div className="w-1/3 flex justify-end">
        <button
          type="button"
          className="text-bgWhite dark:text-bgBlack mx-0.5 hover:scale-110"
          onClick={() => handleUpdate(element.playlistId)}
        >
          <MdUpdate size="24" />
        </button>
        <button
          type="button"
          onClick={() => handleSortClick(element.playlistId)}
          className="text-bgWhite dark:text-bgBlack mx-0.5 hover:scale-110"
        >
          <TbArrowsSort size="24" />
        </button>
        <button
          type="button"
          className=" text-bgWhite dark:text-bgBlack mx-0.5 hover:scale-110"
          onClick={() => handleDeleteFromPlaylist(element.playlistId)}
        >
          <TiDeleteOutline size="24" />
        </button>
      </div>
    </div>
  ));

  return (
    <div className="playlistUsedContainer overflow-auto h-3/6 my-4 w-11/12 mx-auto md:max-w-[1600px]">
      {playlistDetails.length ? playlists : null}
    </div>
  );
}

PlaylistUsed.propTypes = {
  playlistDetails: PropTypes.arrayOf(
    PropTypes.shape({
      playlistName: PropTypes.string.isRequired,
      playlistId: PropTypes.string.isRequired,
      playlistImage: PropTypes.string.isRequired,
      playlistEtag: PropTypes.string.isRequired,
      currentIndex: PropTypes.number.isRequired,

    }),
  ).isRequired,
  player: PropTypes.shape({
    currentActivePlaylistId: PropTypes.string.isRequired,
  }).isRequired,
  addToPlaylistDetails: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  deleteFromPlaylistDetails: PropTypes.func.isRequired,
  addSongsByPlaylistID: PropTypes.func.isRequired,
  setCurrentActivePlaylistId: PropTypes.func.isRequired,
  removePlaylistSongsById: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  modifyEtagInPlaylistDetailsById: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  setIsHasPlaylistLoading: PropTypes.func.isRequired,
  lastPlayedIndexPlaylistDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
  player: state.player,
});

const mapDispatchToProps = {
  currentSong,
  setCurrentActivePlaylistId,
  modifyEtagInPlaylistDetailsById,
  addToPlaylistDetails,
  deleteFromPlaylistDetails,
  addSongsByPlaylistID,
  removePlaylistSongsById,
  isShuffleActive,
  lastPlayedIndexPlaylistDetails,
  setIsHasPlaylistLoading,
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistUsed);
