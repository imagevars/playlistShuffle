import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { fetchData } from "../utils/fetchData";
import {
  Button,
  Input,
  FormControl,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";

const Search = ({ addSongs, currentSong, nextSong, addToPlaylistDetails }) => {
  const [playlistId, setPlaylistId] = useState("");
  const navigate = useNavigate();

  const baseURL = import.meta.env.BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regex = /PL(.*)/;
    const match = playlistId.match(regex);
    const id = "PL" + match[1];

    const data = await fetchData(id);

    addSongs(data.responseArrToAdd);
    currentSong(data.currentSong);
    nextSong(data.nextSong);

    addToPlaylistDetails(data.playlistDetailsObject);
    navigate(`${baseURL}playlist/${id}`);
  };

  const handleChange = (e) => {
    console.log("submited");
    console.log("EE ", e.target.value)
    e.preventDefault();
    setPlaylistId(e.target.value);
  };
  return (
    <Flex className="searchContaienr">
      <form style={{width: '100%'}} onSubmit={(e) => handleSubmit(e)}>

      <FormControl display={"flex"} >
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
          placeholder="playlist url or playlist ID"
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

const mapDispatchToProps = (dispatch) => {
  return {
    addSongs: (payload) => dispatch({ type: "songs/addSongs", payload }),
    currentSong: (payload) => dispatch({ type: "player/currentSong", payload }),
    nextSong: (payload) => dispatch({ type: "player/nextSong", payload }),
    addToPlaylistDetails: (payload) =>
      dispatch({ type: "playlistDetails/addToPlaylistDetails", payload }),
  };
};

export default connect(null, mapDispatchToProps)(Search);
