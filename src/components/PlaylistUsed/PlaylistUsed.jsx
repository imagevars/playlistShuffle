import React from "react";
import { connect } from "react-redux";
import {
  PLAYLISTDETAILS_DELETEFROMPLAYLISTDETAILS,
  PLAYLISTDETAILS_ETAG,
  PLAYLISTDETAILS_ADDTOPLAYLISTDETAILS,
} from "../../constants/playlistDetailsTypes";
import fetchPlaylistVideos from "../utils/fetchPlaylistVideos";
import {
  PLAYLISTSONGS_ADDSONGSBYPLAYLISTID,
  PLAYLISTSONGS_REMOVEPLAYLISTSONGSBYID,
} from "../../constants/playlistSongsByIdTypes";
import {
  PLAYER_SETCURRENTACTIVEPLAYLIST,
  PLAYER_NEXTSONG,
  PLAYER_CURRENTSONG,
  PLAYER_ISPLAYING,
} from "../../constants/playerTypes";
import fetchPlaylistData from "../utils/fetchPlaylistData";
import { useNavigate } from "react-router-dom";


const PlaylistUsed = ({
  playlistDetails,
  addToPlaylistDetails,
  nextSong,
  playlistSongsById,
  player,
  isPlaying,
  deleteFromPlaylistDetails,
  addSongsByPlaylistID,
  setcurrentActivePlaylistId,
  removePlaylistSongsById,
  currentSong,
  modifyEtagInPlaylistDetailsById,
}) => {
  const navigate = useNavigate();

  const playlists = playlistDetails.map((element) => (
    <div
      // w={"100%"}
      // mt={2}
      // display={"flex"}
      // flexDirection={"row"}
      // bg="red.500"
      // borderRadius={"lg"}
      // cursor={"pointer"}
      // m={"16 0"}
      className="playlistUsedList bg-[#bb86fc] flex justify-between w-full"
      key={element.playlistId}
    >
      <div
        className="flex"
        onClick={() => handleClickPlaylist(element.playlistId)}
      >
        <img
          // borderRadius="5% 0 0 5%"
          // alt={element.playlistName}
          // boxSize={["75px", "85px", "120px"]}
          // objectFit="cover"
          className="object-cover w-28 h-28"
          src={element.PlaylistImage}
        />
        <p
          // mt={"1.5"}
          // size={["md", "md", "lg"]}
          // noOfLines={"2"}
          className="usedPlaylistName text-white"
        >
            {element.playlistName}
        </p>
      </div>
      <br />
      <button
        // ml={["5px", "5px", "15px", "15px"]}
        // colorScheme="whiteAlpha"
        // color={"white"}
        className="playlistUsedButton"
        onClick={() => handleDeleteFromPlaylist(element.playlistId)}
      >X</button>
    </div>
  ));

  const handleClickPlaylist = async (id) => {
    await setcurrentActivePlaylistId(id);
    const currentPlaylistInfo = playlistDetails.filter((element) => {
      return element.playlistId === id;
    });

    const data = await fetchPlaylistVideos(
      id,
      currentPlaylistInfo[0].playlistEtag
    );

    // if playlistDataInfo is 304 it means that the playlist hasn't change so we can use the one in localstorage, that way we save api quota
    if (data === 304) {
      await currentSong(
        playlistSongsById[currentPlaylistInfo[0].playlistId][0].snippet
          .resourceId.videoId
      );
      await nextSong(
        playlistSongsById[currentPlaylistInfo[0].playlistId][1].snippet
          .resourceId.videoId
      );
      isPlaying(true);
    } else {
      const playlistObject = {
        id: id,
        songs: data.responseArrToAdd,
      };

      const playlistDataInfo = await fetchPlaylistData(id, data.playlistEtag);
      const playlistEtagAndId = {
        playlistId: id,
        etag: data.playlistEtag,
      };
      await addToPlaylistDetails(playlistDataInfo);
      await modifyEtagInPlaylistDetailsById(playlistEtagAndId);
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
    <div   className="playlistUsedContainer w-11/12 mx-auto">
      {playlistDetails.length ? playlists : null}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    playlistSongsById: state.playlistSongsById,
    songs: state.songs,
    player: state.player,
    playlistDetails: state.playlistDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    currentSong: (payload) => dispatch({ type: PLAYER_CURRENTSONG, payload }),
    nextSong: (payload) => dispatch({ type: PLAYER_NEXTSONG, payload }),
    addToPlaylistDetails: (payload) =>
      dispatch({ type: PLAYLISTDETAILS_ADDTOPLAYLISTDETAILS, payload }),

    deleteFromPlaylistDetails: (payload) =>
      dispatch({ type: PLAYLISTDETAILS_DELETEFROMPLAYLISTDETAILS, payload }),
    addSongsByPlaylistID: (payload) =>
      dispatch({ type: PLAYLISTSONGS_ADDSONGSBYPLAYLISTID, payload }),
    setcurrentActivePlaylistId: (payload) =>
      dispatch({ type: PLAYER_SETCURRENTACTIVEPLAYLIST, payload }),
    removePlaylistSongsById: (payload) =>
      dispatch({ type: PLAYLISTSONGS_REMOVEPLAYLISTSONGSBYID, payload }),
    modifyEtagInPlaylistDetailsById: (payload) =>
      dispatch({ type: PLAYLISTDETAILS_ETAG, payload }),
    isPlaying: (payload) => dispatch({ type: PLAYER_ISPLAYING, payload }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistUsed);