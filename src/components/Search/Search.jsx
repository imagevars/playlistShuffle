import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import fetchPlaylistVideos from "../utils/fetchPlaylistVideos";
import { PLAYLISTSONGS_ADDSONGSBYPLAYLISTID } from "../../constants/playlistSongsByIdTypes";
import {
  PLAYER_SETCURRENTACTIVEPLAYLIST,
  PLAYER_NEXTSONG,
  PLAYER_CURRENTSONG,
} from "../../constants/playerTypes";
import {
  PLAYLISTDETAILS_ADDTOPLAYLISTDETAILS,
  PLAYLISTDETAILS_ETAG,
} from "../../constants/playlistDetailsTypes";
import fetchPlaylistData from "../utils/fetchPlaylistData";
import {
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
  modifyEtagInPlaylistDetailsById,
}) => {
  const [playlistId, setPlaylistId] = useState("");
  const [isloadingButton, setisLoadingButton] = useState(false);
  const [isIdInvalid, setIsIdInvalid] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoadingButton(true);
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
      currentSong(
        playlistSongsById[currentPlaylistInfo[0].playlistId][0].snippet
          .resourceId.videoId
      );
      nextSong(
        playlistSongsById[currentPlaylistInfo[0].playlistId][1].snippet
          .resourceId.videoId
      );
      setisLoadingButton(false);
      navigate(`playlist/${id}`);
    } else if (data === 404) {
      setIsIdInvalid(true);
      setisLoadingButton(false);
    } else {
      const playlistDataInfo = await fetchPlaylistData(id, data.playlistEtag);
      const playlistEtagAndId = {
        playlistId: id,
        etag: data.playlistEtag,
      };
      await addToPlaylistDetails(playlistDataInfo);
      const playlistObject = {
        id: id,
        songs: data.responseArrToAdd,
      };

      await modifyEtagInPlaylistDetailsById(playlistEtagAndId);
      setisLoadingButton(false);
      await addSongsByPlaylistID(playlistObject);
      await currentSong(data.currentSong);
      await nextSong(data.nextSong);
      navigate(`playlist/${id}`);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setPlaylistId(e.target.value);
  };
  return (
    <Flex mt={"20"} className="searchContainer">
      <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
        <FormControl isInvalid={isIdInvalid}>
          <Flex>
            <Input
              errorBorderColor="red.500"
              variant="outline"
              size="lg"
              className="inputSearch"
              pattern="^(?=.*.{24,})(?=.*PL).*"
              type="text"
              required
              onChange={(e) => handleChange(e)}
              value={playlistId}
            />
            <Button
              isLoading={isloadingButton ? true : false}
              colorScheme="red"
              ml={"1.5"}
              size="lg"
              className="submitBtn"
              type="submit"
            >
              Play
            </Button>
          </Flex>
          {isIdInvalid ? (
            <FormErrorMessage>
              THE ID OR URL IS NOT A VALID ONE{" "}
            </FormErrorMessage>
          ) : (
            <FormHelperText>ID or playlist URL</FormHelperText>
          )}
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
    currentSong: (payload) => dispatch({ type: PLAYER_CURRENTSONG, payload }),
    nextSong: (payload) => dispatch({ type: PLAYER_NEXTSONG, payload }),
    addToPlaylistDetails: (payload) =>
      dispatch({ type: PLAYLISTDETAILS_ADDTOPLAYLISTDETAILS, payload }),
    addSongsByPlaylistID: (payload) =>
      dispatch({ type: PLAYLISTSONGS_ADDSONGSBYPLAYLISTID, payload }),
    setcurrentActivePlaylistId: (payload) =>
      dispatch({ type: PLAYER_SETCURRENTACTIVEPLAYLIST, payload }),
    modifyEtagInPlaylistDetailsById: (payload) =>
      dispatch({ type: PLAYLISTDETAILS_ETAG, payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);