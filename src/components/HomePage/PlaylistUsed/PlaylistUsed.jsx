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
import fetchPlaylistVideos from '../../../utils/fetchPlaylistVideos';
import fetchPlaylistData from '../../../utils/fetchPlaylistData';
import {
  addSongsByPlaylistID,
  removePlaylistSongsById,
} from '../../../redux/actions/playlistSongsByIdActions';
import {
  setCurrentActivePlaylistId,
  currentSong,
  setIsPlLoading,
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
  setIsPlLoading,
}) {
  const navigate = useNavigate();

  const handleClickPlaylist = async (id) => {
    isShuffleActive(false);
    setCurrentActivePlaylistId(id);

    setIsPlLoading(true);
    const findPlaylistIndex = playlistDetails.findIndex(
      (element) => element.playlistId === id,
    );

    currentSong(
      playlistSongsById[id][playlistDetails[findPlaylistIndex].currentIndex]
        .snippet.resourceId.videoId,
    );
    setIsPlLoading(false);
    navigate(`/${id}`);
  };

  const handleDeleteFromPlaylist = (id) => {
    currentSong('');
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
    setIsPlLoading(true);
    setCurrentActivePlaylistId(id);
    const currentPlaylistInfo = playlistDetails.filter(
      (element) => element.playlistId === id,
    );

    const data = await fetchPlaylistVideos(
      id,
      currentPlaylistInfo[0].playlistEtag,
    );
    if (data === 304 || data === undefined || data === 404) {
      setIsPlLoading(false);
    } else {
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
    setIsPlLoading(false);
  };

  const playlists = playlistDetails.map((element) => (
    <div
      className="playlistUsedList flex justify-between cursor-pointer  my-2 mx-2 rounded-lg text-bgWhite  bg-primary image:bg-primary/60 hover:bg-secondary hover:image:bg-primary/80"
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

        <p className="usedPlaylistName ml-2 text-sm md:text-base font-open text-bgWhite dark:text-bgWhite font-medium truncate ">
          {element.playlistName}
        </p>
      </button>
      <div className="w-1/4 flex justify-end">
        {element.playlistId.includes('MIX') ? null : (
          <div className="group relative w-max my-auto">
            <button
              type="button"
              className="text-white mx-0.5 active:scale-110"
              onClick={() => handleUpdate(element.playlistId)}
            >
              <MdUpdate size="24" />
            </button>
            <span className="pointer-events-none absolute -translate-x-2/4  left-2/4  -bottom-full w-max rounded bg-bgBlack px-2 py-1 text-sm font-medium text-bgWhite opacity-0 shadow transition-opacity duration-250 ease-in group-hover:opacity-100">
              {' '}
              Update{' '}
            </span>
          </div>
        )}

        <div className="group relative w-max my-auto">
          <button
            type="button"
            onClick={() => handleSortClick(element.playlistId)}
            className="text-bgWhite dark:text-bgWhite mx-0.5 active:scale-110"
          >
            <TbArrowsSort size="24" />
          </button>
          <span className="pointer-events-none absolute -translate-x-2/4  left-1/4  -bottom-full w-max rounded bg-bgBlack px-2 py-1 text-sm font-medium text-bgWhite opacity-0 shadow transition-opacity duration-250 ease-in group-hover:opacity-100">
            Sort by Default
          </span>
        </div>
        <div className="group relative w-max my-auto">
          <button
            type="button"
            className=" text-bgWhite dark:text-bgWhite mx-0.5 active:scale-110"
            onClick={() => handleDeleteFromPlaylist(element.playlistId)}
          >
            <TiDeleteOutline size="24" />
          </button>
          <span className="pointer-events-none absolute -translate-x-2/4  left-1/4  -bottom-full w-max rounded bg-bgBlack px-2 py-1 text-sm font-medium text-bgWhite opacity-0 shadow transition-opacity duration-250 ease-in group-hover:opacity-100">
            Delete
          </span>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="playlistUsedContainer overflow-x-hidden overflow-y-auto h-3/6 my-4 w-11/12 mx-auto md:max-w-[1600px]">
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
  lastPlayedIndexPlaylistDetails: PropTypes.func.isRequired,
  setIsPlLoading: PropTypes.func.isRequired,
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
  setIsPlLoading,
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistUsed);
