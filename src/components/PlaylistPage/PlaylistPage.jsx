import React, { useEffect } from "react";
import Card from "../Card/Card";
import MediaButtons from "../MediaButtons/MediaButtons";
import Player from "../Player/Player";
import PlayingRightNow from "../PlayingRightNow/PlayingRightNow";
import Navbar from "../Navbar/Navbar";
import { Flex, Container, Box } from "@chakra-ui/react";
import PlaylistInfo from "../PlaylistInfo/PlaylistInfo";
import { connect } from "react-redux";

const PlaylistPage = ({
  songs,
  isPlaying,
  player,
  isLoopActive,
  isShuffleActive,
  currentSong,
  previousSong,
  nextSong,
}) => {
  useEffect(() => {
    console.log(player);
  });
  const handleKeyPress = (e) => {
    console.log(e.code);
    switch (e.code) {
      case "Space": {
        isPlaying(player.isPlaying === true ? false : true);
        console.log(true);
        break;
      }
      case "KeyR": {
        isLoopActive(player.isLoopActive === true ? false : true);
        console.log(true);
        break;
      }
      case "KeyS": {
        isShuffleActive(player.isShuffleActive === true ? false : true);
        console.log(true);
        break;
      }
      case "ArrowLeft": {
        const currIndex = songs.findIndex((song) => {
          return song.snippet.resourceId.videoId === player.currentSong;
        });
        if (currIndex !== 0) {
          previousSong(songs[currIndex - 2]?.snippet.resourceId.videoId);
          currentSong(songs[currIndex - 1]?.snippet.resourceId.videoId);
          nextSong(songs[currIndex]?.snippet.resourceId.videoId);
        }
        break;
      }
      case "ArrowRight": {
        const currIndex = songs.findIndex((ele) => {
          return ele.snippet?.resourceId.videoId === player.currentSong;
        });

        if (currIndex < songs.length - 1) {
          previousSong(songs[currIndex]?.snippet.resourceId.videoId);
          currentSong(songs[currIndex + 1]?.snippet.resourceId.videoId);
          nextSong(songs[currIndex + 2]?.snippet.resourceId.videoId);
        } else if (currIndex === songs.length - 1) {
          console.log("No more songs left");
        }
        break;
      }
    }
  };
  return (
    <Container
      onKeyUp={(e) => handleKeyPress(e)}
      tabIndex={0}
      className="container"
      w="100%"
      h={'100vh'}
      maxWidth="1866px"
    >
      <Navbar />

      <Flex mb={"1.5"}>
        <PlaylistInfo />
      </Flex>

      <Box
        w={["95%", null, null, "85%"]}
        m={"0 auto"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Flex
          className="mainContent"
          h={[null, null, null, "2xl", "2xl", "2xl"]}
          maxH={"1900px"}
          flexDirection={["column", "column", "row"]}
          alignItems={["center", "center", "center", "inherit"]}
          w={"100%"}
        >
          <Box
            w={["100%", "100%", null, "40%"]}
            h={["30vh", "30vh", "95%"]}
            maxH={"1900px"}
          >
            <Player />
          </Box>
          <Box
            mt={["10px", "10px", null, null]}
            w={["100%", "100%", null, "50%"]}
            h={["35vh", "35vh", "35vh", "80%"]}
            maxH={"1900px"}
          >
            <Card />
          </Box>
        </Flex>
        <Box
          minW={"100%"}
          position={"fixed"}
          bottom={"0"}
          bg={"red.100"}
          className="bottomMedia"
          display={"flex"}
          flexDirection={["column", "column", "column", "column"]}
        >
          <Flex justify={"center"}>
            <PlayingRightNow />
          </Flex>
          <footer>
            <Flex justify={"center"} className="mediaButtonsContainer">
              <MediaButtons />
            </Flex>
          </footer>
        </Box>
      </Box>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    isPlaying: (payload) => dispatch({ type: "player/isPlaying", payload }),
    isLoopActive: (payload) =>
      dispatch({ type: "player/isLoopActive", payload }),
    isShuffleActive: (payload) =>
      dispatch({ type: "player/isShuffleActive", payload }),
    isShuffleLoading: (payload) =>
      dispatch({ type: "player/isShuffleLoading", payload }),
    previousSong: (payload) =>
      dispatch({ type: "player/previousSong", payload }),
    currentSong: (payload) => dispatch({ type: "player/currentSong", payload }),
    nextSong: (payload) => dispatch({ type: "player/nextSong", payload }),
  };
};

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    player: state.player,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
