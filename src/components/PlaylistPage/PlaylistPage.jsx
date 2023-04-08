import React, { useEffect } from "react";
import VideoCard from "../VideoCard/VideoCard";
import MediaButtons from "../MediaButtons/MediaButtons";
import Player from "../Player/Player";
import PlayingRightNow from "../PlayingRightNow/PlayingRightNow";
import Navbar from "../Navbar/Navbar";
import { Flex, Container, Box } from "@chakra-ui/react";
import PlaylistInfo from "../PlaylistInfo/PlaylistInfo";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const PlaylistPage = ({
  songs,
  isPlaying,
  player,
  isLoopActive,
  isShuffleActive,
  currentSong,
  previousSong,
  nextSong,
  playlistSongsById,
}) => {
  const { id } = useParams();

  const handleKeyPress = (e) => {
    switch (e.code) {
      case "Space": {
        isPlaying(player.isPlaying === true ? false : true);
        break;
      }
      case "KeyR": {
        isLoopActive(player.isLoopActive === true ? false : true);
        break;
      }
      case "KeyS": {
        isShuffleActive(player.isShuffleActive === true ? false : true);
        break;
      }
      case "ArrowLeft": {
        const currIndex = playlistSongsById[
          player.currentActivePlaylistId
        ].findIndex((song) => {
          return song.snippet.resourceId.videoId === player.currentSong;
        });
        if (currIndex !== 0) {
          previousSong(
            playlistSongsById[player.currentActivePlaylistId][currIndex - 2]
              ?.snippet.resourceId.videoId
          );
          currentSong(
            playlistSongsById[player.currentActivePlaylistId][currIndex - 1]
              ?.snippet.resourceId.videoId
          );
          nextSong(
            playlistSongsById[player.currentActivePlaylistId][currIndex]
              ?.snippet.resourceId.videoId
          );
        }
        break;
      }
      case "ArrowRight": {
        const currIndex = playlistSongsById[
          player.currentActivePlaylistId
        ].findIndex((ele) => {
          return ele.snippet?.resourceId.videoId === player.currentSong;
        });

        if (
          currIndex <
          playlistSongsById[player.currentActivePlaylistId].length - 1
        ) {
          previousSong(
            playlistSongsById[player.currentActivePlaylistId][currIndex]
              ?.snippet.resourceId.videoId
          );
          currentSong(
            playlistSongsById[player.currentActivePlaylistId][currIndex + 1]
              ?.snippet.resourceId.videoId
          );
          nextSong(
            playlistSongsById[player.currentActivePlaylistId][currIndex + 2]
              ?.snippet.resourceId.videoId
          );
        } else if (
          currIndex ===
          playlistSongsById[player.currentActivePlaylistId].length - 1
        ) {
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
      h={"100vh"}
      maxWidth="1866px"
    >
      <Navbar />

      <Flex justify={["center", "center", "left", "left"]} mb={"1.5"}>
        <PlaylistInfo />
      </Flex>

      <Box
      className="box"
        w={["95%", null, null, "95%"]}
        m={"0 auto"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Flex
          className="mainContent"
          h={["100%", "600px", "65vh", "65vh", "65vh", "65vh"]}
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
            mt={["10px", "10px", "10px", null]}
            w={["100%", "100%", null, "50%"]}
            h={["100%", "100%", "100%"]}
            maxH={"1900px"}
          >
            <VideoCard />
          </Box>
        </Flex>
        <Box
          className="bottomMedia"
          minW={"100%"}
          position={"fixed"}
          bottom={"0"}
          h={ ["18%", "14%" ] }
          left={"0"}
          bg={"red.100"}
          display={"flex"}
          pt={["1", "1", "5"]}
          pb={[null, null, "2"]}
          flexDirection={["column", "column", "row", "row"]}
          justifyContent={["center"]}
        >
          <Flex justify={"center"}>
            <PlayingRightNow />
          </Flex>
          <Flex
            justify={"center"}
            alignItems={"center"}
            className="mediaButtonsContainer"
          >
            <MediaButtons />
          </Flex>
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
    playlistSongsById: state.playlistSongsById,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);
