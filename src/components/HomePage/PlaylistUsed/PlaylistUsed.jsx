import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  addToPlaylistDetails,
  deleteFromPlaylistDetails,
  modifyEtagInPlaylistDetailsById,
  lastPlayedPlaylistDetails,
} from '../../../redux/actions/playlistDetailsActions';
import fetchPlaylistVideos from '../../utils/fetchPlaylistVideos';
import fetchPlaylistData from '../../utils/fetchPlaylistData';
import {
  addSongsByPlaylistID,
  removePlaylistSongsById,
} from '../../../redux/actions/playlistSongsByIdActions';
import {
  setCurrentActivePlaylistId,
  isPlaying,
  currentSong,
  isShuffleActive,
} from '../../../redux/actions/playerActions';

function PlaylistUsed({
  playlistDetails,
  addToPlaylistDetails,
  playlistSongsById,
  isPlaying,
  deleteFromPlaylistDetails,
  addSongsByPlaylistID,
  setCurrentActivePlaylistId,
  removePlaylistSongsById,
  currentSong,
  modifyEtagInPlaylistDetailsById,
  isShuffleActive,
  player,
}) {
  const navigate = useNavigate();

  const handleClickPlaylist = async (id) => {
    isShuffleActive(false);
    setCurrentActivePlaylistId(id);
    const currentPlaylistInfo = playlistDetails.filter((element) => element.playlistId === id);

    const data = await fetchPlaylistVideos(
      id,
      currentPlaylistInfo[0].playlistEtag,
    );

    // if playlistDataInfo is 304 it means that the playlist hasn't change so we can use the one in
    //  localstorage, that way we save api quota
    if (data === 304) {
      if (player.rememberLastVideo) {
        const findPlaylistIndex = playlistDetails.findIndex((element) => element.playlistId === id);

        currentSong(
          playlistSongsById[id][playlistDetails[findPlaylistIndex].currentIndex]
            .snippet.resourceId.videoId,
        );
      } else {
        currentSong(
          playlistSongsById[currentPlaylistInfo[0].playlistId][0].snippet
            .resourceId.videoId,
        );
      }
      isPlaying(true);
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
    }

    navigate(`/${id}`);
  };

  const handleDeleteFromPlaylist = (id) => {
    removePlaylistSongsById(id);
    deleteFromPlaylistDetails(id);
  };

  const playlists = playlistDetails.map((element) => (
    <div
      className="playlistUsedList cursor-pointer h-16 my-2 rounded-sm bg-[#23036a] flex justify-between w-full"
      key={element.playlistId}
    >
      <button
        type="button"
        className="flex w-11/12"
        onClick={() => handleClickPlaylist(element.playlistId)}
      >
        <img
          className="object-cover w-24 h-16 rounded-l-sm"
          alt={`${element.playlistName}`}
          src={element.playlistImage}
        />
        <p className="usedPlaylistName  text-lg font-semibold truncate  text-white">
          {element.playlistName}
        </p>
      </button>

      <button
        type="button"
        className="playlistUsedButton mx-1 text-lg text-white font-medium  self-baseline"
        onClick={() => handleDeleteFromPlaylist(element.playlistId)}
      >
        X
      </button>
    </div>
  ));

  return (
    <div className="playlistUsedContainer w-11/12 mx-auto ">
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
    rememberLastVideo: PropTypes.bool.isRequired,
  }).isRequired,
  addToPlaylistDetails: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  isPlaying: PropTypes.func.isRequired,
  deleteFromPlaylistDetails: PropTypes.func.isRequired,
  addSongsByPlaylistID: PropTypes.func.isRequired,
  setCurrentActivePlaylistId: PropTypes.func.isRequired,
  removePlaylistSongsById: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  modifyEtagInPlaylistDetailsById: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
  player: state.player,
});

const mapDispatchToProps = {
  currentSong,
  isPlaying,
  setCurrentActivePlaylistId,
  modifyEtagInPlaylistDetailsById,
  addToPlaylistDetails,
  deleteFromPlaylistDetails,
  addSongsByPlaylistID,
  removePlaylistSongsById,
  isShuffleActive,
  lastPlayedPlaylistDetails,
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistUsed);
