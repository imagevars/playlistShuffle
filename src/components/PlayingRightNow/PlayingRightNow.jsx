import React from "react";
import { connect } from "react-redux";
import { Heading, Text, Flex, Image } from "@chakra-ui/react";

const PlayingRightNow = ({ player, songs }) => {
  const currIndex = songs.findIndex((ele) => {
    return ele.snippet?.resourceId.videoId === player.currentSong;
  });
  return (
    <Flex mt={"1"} alignItems={"center"}>
      <Image
        boxSize={["45px", "55px", "65px", "75px"]}
        objectFit="cover"
        borderRadius="full"
        alt={songs[currIndex].snippet.title}
        src={songs[currIndex].snippet.thumbnails.default.url}
      />
      <Heading
        textAlign={"center"}
        width={"95%"}
        color={"var(--chakra-colors-red-600)"}
        className="songTitle"
        size={["sm", "md", "md", "lg", "lg", "3xl"]}
      >
        <Text noOfLines={"1"}>{songs[currIndex].snippet.title}</Text>{" "}
      </Heading>
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    player: state.player,
  };
};

export default connect(mapStateToProps, null)(PlayingRightNow);
