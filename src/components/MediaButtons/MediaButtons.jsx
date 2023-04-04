import React from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import {
  BiPlayCircle,
  BiPauseCircle,
  BiShuffle,
  BiSkipPreviousCircle,
  BiSkipNextCircle,
} from "react-icons/bi";
import { TbRepeatOff, TbRepeatOnce, TbRepeat } from "react-icons/tb";
import { connect } from "react-redux";

const MediaButtons = ({
  songs,
  player,
  isPlaying,
  isShuffleActive,
  previousSong,
  currentSong,
  nextSong,
  addSongs,
}) => {
  const playPauseButton = (e) => {
    isPlaying(e);
  };

  const handleClickPreviousButton = () => {
    const currIndex = songs.findIndex((song) => {
      return song.snippet.resourceId.videoId === player.currentSong;
    });
    if (currIndex !== 0) {
      previousSong(songs[currIndex - 2]?.snippet.resourceId.videoId);
      currentSong(songs[currIndex - 1]?.snippet.resourceId.videoId);
      nextSong(songs[currIndex]?.snippet.resourceId.videoId);
    }
  };
  const handleClickNextButton = () => {
    const currIndex = songs.findIndex((ele) => {
      return ele.snippet?.resourceId.videoId === player.currentSong;
    });

    if (currIndex < songs.length - 1) {
      previousSong(songs[currIndex]?.snippet.resourceId.videoId);
      currentSong(songs[currIndex + 1]?.snippet.resourceId.videoId);
      nextSong(songs[currIndex + 2]?.snippet.resourceId.videoId);
    } else if (currIndex === songs.length - 1) {
      // previousSong(songs[currIndex]?.snippet.resourceId.videoId);
      // currentSong(songs[currIndex + 1]?.snippet.resourceId.videoId);
      // nextSong('');
    }
  };

  const handleClickShuffle = () => {
    if (player.isShuffleActive === false) {
      isShuffleActive(true);
    } else {
      isShuffleActive(false);
      let unShuffleArr = [];
      unShuffleArr.push(...songs);
      unShuffleArr.sort(function (a, b) {
        return a.snippet.position - b.snippet.position;
      });
      addSongs(unShuffleArr);
      currentSong(unShuffleArr[0].snippet.resourceId.videoId);
      nextSong(unShuffleArr[1].snippet.resourceId.videoId);
    }
  };
  return (
    <Flex
      flexDirection={"row"}
      alignItems={"baseline"}
      className="mediaButtons "
      maxW={"100%"}
    >
      <Box>
        <IconButton
          colorScheme="red"
          size="1.5rem"
          ml={"1.5"}
          mr={"1.5"}
          icon={<TbRepeatOff size={50} />}
        />
      </Box>
      <Box>
        <IconButton
          onClick={handleClickPreviousButton}
          colorScheme="red"
          size="2rem"
          ml={"1.5"}
          mr={"1.5"}
          icon={<BiSkipPreviousCircle size={50} />}
        />
      </Box>
      {/* <MdSkipPrevious /> */}
      {player.isPlaying === true ? (
        <Box>
          <IconButton
            onClick={() => playPauseButton(false)}
            colorScheme="red"
            size="2rem"
            ml={"1.5"}
            mr={"1.5"}
            icon={<BiPauseCircle size={65} />}
          />
        </Box>
      ) : (
        <Box>
          <IconButton
            onClick={() => playPauseButton(true)}
            colorScheme="red"
            size="2rem"
            ml={"1.5"}
            mr={"1.5"}
            icon={<BiPlayCircle size={65} />}
          />

          {/* <BiPlayCircle className=" " onClick={} /> */}
        </Box>
      )}
      <Box>
        <IconButton
          onClick={handleClickNextButton}
          colorScheme="red"
          size="1.5rem"
          ml={"1.5"}
          mr={"1.5"}
          icon={<BiSkipNextCircle size={50} />}
        />
      </Box>
      {/* <MdSkipNext /> */}
      {player.isShuffleActive ? (
        <Box>
          <IconButton
            onClick={handleClickShuffle}
            bg={"red.800"}
            color={"white"}
            size="1.5rem"
            ml={"1.5"}
            mr={"1.5"}
            _hover={{
              background: "var(--chakra-colors-red-600)",
              color: "white",
            }}
            icon={<BiShuffle size={50} />}
          />
        </Box>
      ) : (
        <Box>
          <IconButton
            onClick={handleClickShuffle}
            colorScheme="red"
            size="1.5rem"
            ml={"1.5"}
            mr={"1.5"}
            icon={<BiShuffle size={50} />}
          />

          {/* <BiShuffle className=" " onClick={handleClickShuffle} /> */}
        </Box>
      )}
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    songs: state.songs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isPlaying: (payload) => dispatch({ type: "player/isPlaying", payload }),
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
