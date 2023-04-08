import React from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import {
  BiPlayCircle,
  BiPauseCircle,
  BiShuffle,
  BiSkipPreviousCircle,
  BiSkipNextCircle,
} from "react-icons/bi";
import { TbRepeatOff, TbRepeatOnce } from "react-icons/tb";
import { connect } from "react-redux";

const MediaButtons = ({
  player,
  isPlaying,
  isLoopActive,
  isShuffleActive,
  previousSong,
  currentSong,
  nextSong,
  playlistSongsById,
}) => {
  const playPauseButton = (e) => {
    isPlaying(e);
  };

  const handleClickPreviousButton = () => {
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
        playlistSongsById[player.currentActivePlaylistId][currIndex]?.snippet
          .resourceId.videoId
      );
    }
  };
  const handleClickNextButton = () => {
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
        playlistSongsById[player.currentActivePlaylistId][currIndex]?.snippet
          .resourceId.videoId
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
  };

  const handleClickShuffle = () => {
    if (player.isShuffleActive === false) {
      isShuffleActive(true);
    } else {
      isShuffleActive(false);
    }
  };
  return (
    <Flex
      flexDirection={"row"}
      alignItems={"baseline"}
      className="mediaButtons "
      maxW={"100%"}
    >
      {player.isLoopActive === true ? (
        <Box passive="true" onClick={() => isLoopActive(false)}>
          <IconButton
            colorScheme="red"
            size="2rem"
            ml={"1.5"}
            mr={"1.5"}
            icon={<TbRepeatOnce size={45} />}
          />
        </Box>
      ) : (
        <Box>
          <IconButton
            colorScheme="red"
            size="2rem"
            ml={"1.5"}
            passive="true"
            onClick={() => isLoopActive(true)}
            mr={"1.5"}
            icon={<TbRepeatOff size={45} />}
          />
        </Box>
      )}

      <Box>
        <IconButton
          passive="true"
          onClick={handleClickPreviousButton}
          colorScheme="red"
          size="1.5rem"
          ml={"1.5"}
          mr={"1.5"}
          icon={<BiSkipPreviousCircle size={45} />}
        />
      </Box>
      {player.isPlaying === true ? (
        <Box>
          <IconButton
            passive="true"
            colorScheme="red"
            size="2rem"
            ml={"1.5"}
            mr={"1.5"}
            onClick={() => playPauseButton(false)}
            icon={<BiPauseCircle size={55} />}
          />
        </Box>
      ) : (
        <Box>
          <IconButton
            colorScheme="red"
            size="2rem"
            ml={"1.5"}
            passive="true"
            mr={"1.5"}
            onClick={() => playPauseButton(true)}
            icon={<BiPlayCircle size={55} />}
          />
        </Box>
      )}
      <Box>
        <IconButton
          onClick={handleClickNextButton}
          colorScheme="red"
          size="1.5rem"
          passive="true"
          ml={"1.5"}
          mr={"1.5"}
          icon={<BiSkipNextCircle size={45} />}
        />
      </Box>
      {player.isShuffleActive ? (
        <Box>
          <IconButton
            onClick={handleClickShuffle}
            bg={"red.800"}
            color={"white"}
            size="1.5rem"
            passive="true"
            ml={"1.5"}
            mr={"1.5"}
            _hover={{
              background: "var(--chakra-colors-red-600)",
              color: "white",
            }}
            icon={<BiShuffle size={45} />}
          />
        </Box>
      ) : (
        <Box>
          <IconButton
            onClick={handleClickShuffle}
            colorScheme="red"
            size="1.5rem"
            passive="true"
            ml={"1.5"}
            mr={"1.5"}
            icon={<BiShuffle size={45} />}
          />
        </Box>
      )}
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    songs: state.songs,
    playlistSongsById: state.playlistSongsById,
  };
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
    addSongs: (payload) => dispatch({ type: "songs/addSongs", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaButtons);