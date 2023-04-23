import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  addToPlaylistDetails,
  deleteFromPlaylistDetails,
  modifyEtagInPlaylistDetailsById,
  lastPlayedPlaylistDetails,
} from "../../redux/actions/playlistDetailsActions";
import fetchPlaylistVideos from "../utils/fetchPlaylistVideos";
import fetchPlaylistData from "../utils/fetchPlaylistData";
import {
  addSongsByPlaylistID,
  removePlaylistSongsById,
} from "../../redux/actions/playlistSongsByIdActions";
import {
  setcurrentActivePlaylistId,
  nextSong,
  isPlaying,
  currentSong,
  isShuffleActive,
} from "../../redux/actions/playerActions";
const PlaylistUsed = ({
  playlistDetails,
  addToPlaylistDetails,
  nextSong,
  playlistSongsById,
  isPlaying,
  deleteFromPlaylistDetails,
  addSongsByPlaylistID,
  setcurrentActivePlaylistId,
  removePlaylistSongsById,
  currentSong,
  modifyEtagInPlaylistDetailsById,
  isShuffleActive,
  lastPlayedPlaylistDetails,
  player,
}) => {
  const navigate = useNavigate();

  const playlists = playlistDetails.map((element) => (
    <div
      className="playlistUsedList cursor-pointer h-24 my-2 rounded-sm bg-[#bb86fc] flex justify-between w-full"
      key={element.playlistId}
    >
      <div
        className="flex w-11/12"
        onClick={() => handleClickPlaylist(element.playlistId)}
      >
        <img
          className="object-cover w-24 h-24 rounded-l-sm"
          alt={`${element.playlistName} image`}
          src={element.playlistImage}
        />
        <p className="usedPlaylistName  text-lg font-semibold truncate  text-white">
          {element.playlistName}
        </p>
      </div>

      <button
        className="playlistUsedButton mx-1 text-lg text-white font-medium  self-baseline"
        onClick={() => handleDeleteFromPlaylist(element.playlistId)}
      >
        X
      </button>
    </div>
  ));

  const handleClickPlaylist = async (id) => {
    isShuffleActive(false);
    setcurrentActivePlaylistId(id);
    const currentPlaylistInfo = playlistDetails.filter((element) => {
      return element.playlistId === id;
    });

    const data = await fetchPlaylistVideos(
      id,
      currentPlaylistInfo[0].playlistEtag
    );

    // if playlistDataInfo is 304 it means that the playlist hasn't change so we can use the one in localstorage, that way we save api quota
    if (data === 304) {
      if (player.rememberLastVideo) {
        const findPlaylistIndex = playlistDetails.findIndex((element) => {
          return element.playlistId === id;
        });

        currentSong(
          playlistSongsById[id][playlistDetails[findPlaylistIndex].currentIndex]
            .snippet.resourceId.videoId
        );
      } else {
        currentSong(
          playlistSongsById[currentPlaylistInfo[0].playlistId][0].snippet
            .resourceId.videoId
        );
        nextSong(
          playlistSongsById[currentPlaylistInfo[0].playlistId][1].snippet
            .resourceId.videoId
        );
      }
      isPlaying(true);
    }
     else {
      const playlistObject = {
        id: id,
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
      nextSong(data.nextSong);
    }

    navigate(`playlist/${id}`);
  };

  const handleDeleteFromPlaylist = (id) => {
    removePlaylistSongsById(id);
    deleteFromPlaylistDetails(id);
  };

  return (
    <div className="playlistUsedContainer w-11/12 mx-auto ">
      {playlistDetails.length ? playlists : null}
    </div>
  );
};

PlaylistUsed.proptypes = {
  playlistDetails: PropTypes.arrayOf(
    PropTypes.shape({
      playlistName: PropTypes.string.isRequired,
      playlistId: PropTypes.string.isRequired,
      playlistImage: PropTypes.string.isRequired,
      playlistEtag: PropTypes.string.isRequired,
    })
  ).isRequired,
  addToPlaylistDetails: PropTypes.func.isRequired,
  nextSong: PropTypes.func,
  playlistSongsById: PropTypes.object.isRequired,
  isPlaying: PropTypes.func.isRequired,
  deleteFromPlaylistDetails: PropTypes.func.isRequired,
  addSongsByPlaylistID: PropTypes.func.isRequired,
  setcurrentActivePlaylistId: PropTypes.func.isRequired,
  removePlaylistSongsById: PropTypes.func.isRequired,
  currentSong: PropTypes.func.isRequired,
  modifyEtagInPlaylistDetailsById: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    playlistSongsById: state.playlistSongsById,
    playlistDetails: state.playlistDetails,
    player: state.player,
  };
};

const mapDispatchToProps = {
  currentSong: currentSong,
  nextSong: nextSong,
  isPlaying: isPlaying,
  setcurrentActivePlaylistId: setcurrentActivePlaylistId,
  modifyEtagInPlaylistDetailsById: modifyEtagInPlaylistDetailsById,
  addToPlaylistDetails: addToPlaylistDetails,
  deleteFromPlaylistDetails: deleteFromPlaylistDetails,
  addSongsByPlaylistID: addSongsByPlaylistID,
  removePlaylistSongsById: removePlaylistSongsById,
  isShuffleActive: isShuffleActive,
  lastPlayedPlaylistDetails: lastPlayedPlaylistDetails,
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistUsed);
