import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import fetchPlaylistVideos from "../utils/fetchPlaylistVideos";
import fetchPlaylistData from "../utils/fetchPlaylistData";
import {
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";

const Search = ({
  playlistDetails,
  currentSong,
  nextSong,
  addToPlaylistDetails,
  addSongsByPlaylistID,
  playlistSongsById,
  setcurrentActivePlaylistId,
  player,
  modifyEtagInPlaylistDetailsById,
}) => {
  const [playlistId, setPlaylistId] = useState("");
  const navigate = useNavigate();

  const baseURL = import.meta.env.BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regex = /PL(.*)/;
    const match = playlistId.match(regex);
    const id = "PL" + match[1];
    const currentPlaylistInfo = playlistDetails.filter(
      (element) => element.playlistId === id
    );
    setcurrentActivePlaylistId(id);

    const currEtag =
      currentPlaylistInfo.length > 0 ? currentPlaylistInfo[0].playlistEtag : "";
    const data = await fetchPlaylistVideos(id, currEtag);

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

  const handleChange = (e) => {
    e.preventDefault();
    setPlaylistId(e.target.value);
  };
  return (
    <Flex mt={"20"} className="searchContainer">
      <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
        <FormControl display={"flex"}>
          <Input
            variant="flushed"
            colorScheme="red"
            size="lg"
            className="inputSearch"
            pattern="^(?=.*.{24,})(?=.*PL).*"
            title="Please enter a valid YouTube playlist URL or ID"
            type="text"
            required
            onChange={(e) => handleChange(e)}
            value={playlistId}
            placeholder="youtube.com/playlist?list=PLi06ybkpczJDt0Ydo3Umjtv97bDOcCtAZ"
          />
          <Button
            colorScheme="red"
            ml={"1.5"}
            size="lg"
            className="submitBtn"
            type="submit"
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addSongs: (payload) => dispatch({ type: "songs/addSongs", payload }),
    currentSong: (payload) => dispatch({ type: "player/currentSong", payload }),
    nextSong: (payload) => dispatch({ type: "player/nextSong", payload }),
    addToPlaylistDetails: (payload) =>
      dispatch({ type: "playlistDetails/addToPlaylistDetails", payload }),
    addSongsByPlaylistID: (payload) =>
      dispatch({ type: "songs/addSongsByPlaylistID", payload }),
    setcurrentActivePlaylistId: (payload) =>
      dispatch({ type: "player/setcurrentActivePlaylistId", payload }),
    modifyEtagInPlaylistDetailsById: (payload) =>
      dispatch({ type: "playlistDetails/Etag", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
