import React, { useEffect } from "react";
import { connect } from "react-redux";
import fetchPlaylistVideos from "../utils/fetchPlaylistVideos";
import fetchPlaylistData from "../utils/fetchPlaylistData";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Flex,
  Spacer,
  Image,
  Text,
  CloseButton,
  Heading,
} from "@chakra-ui/react";

const PlaylistUsed = ({
  playlistDetails,
  addToPlaylistDetails,
  nextSong,
  playlistSongsById,
  player,
  deleteFromPlaylistDetails,
  addSongsByPlaylistID,
  setcurrentActivePlaylistId,
  removePlaylistSongsById,
  currentSong,
  modifyEtagInPlaylistDetailsById,
}) => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.BASE_URL;

  const playlists = playlistDetails.map((element) => (
    <Card
      w={"100%"}
      mt={2}
      display={"flex"}
      flexDirection={"row"}
      bg="red.500"
      borderRadius={"lg"}
      cursor={"pointer"}
      m={"16 0"}
      className="playlistUsedList"
      key={element.playlistId}
    >
      <Flex
        className="usedContentTextandImage"
        onClick={() => handleClickPlaylist(element.playlistId)}
      >
        <Image
          borderRadius="5% 0 0 5%"
          alt={element.playlistName}
          boxSize={["75px", "85px", "120px"]}
          objectFit="cover"
          className="imgUsedPlaylist"
          src={element.PlaylistImage}
        />
        <Heading
        mt={"1.5"}
          size={["md", "md", "lg"]}
          noOfLines={"2"}
          className="usedPlaylistName"
        >
          <Text color={"whiteAlpha.900"} noOfLines={[2, 2]}>
            {element.playlistName}
          </Text>
        </Heading>
      </Flex>
      <Spacer />
      <CloseButton
        ml={["5px", "5px", "15px", "15px"]}
        colorScheme="whiteAlpha"
        color={"white"}
        className="playlistUsedButton"
        onClick={() => handleDeleteFromPlaylist(element.playlistId)}
      />
    </Card>
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

    navigate(`${baseURL}/playlist/${id}`);
  };

  const handleDeleteFromPlaylist = (id) => {
    removePlaylistSongsById(id);
    deleteFromPlaylistDetails(id);
  };

  return (
    <Flex flexDirection={"column"} className="playlistUsedContainer">
      {playlistDetails.length ? playlists : null}
    </Flex>
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
    addSongs: (payload) => dispatch({ type: "songs/addSongs", payload }),
    currentSong: (payload) => dispatch({ type: "player/currentSong", payload }),
    nextSong: (payload) => dispatch({ type: "player/nextSong", payload }),
    addToPlaylistDetails: (payload) =>
      dispatch({ type: "playlistDetails/addToPlaylistDetails", payload }),

    deleteFromPlaylistDetails: (payload) =>
      dispatch({ type: "playlistDetails/deleteFromPlaylistDetails", payload }),
    addSongsByPlaylistID: (payload) =>
      dispatch({ type: "songs/addSongsByPlaylistID", payload }),
    setcurrentActivePlaylistId: (payload) =>
      dispatch({ type: "player/setcurrentActivePlaylistId", payload }),
    removePlaylistSongsById: (payload) =>
      dispatch({ type: "playlistSongs/removePlaylistSongsById", payload }),
    modifyEtagInPlaylistDetailsById: (payload) =>
      dispatch({ type: "playlistDetails/Etag", payload }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistUsed);
