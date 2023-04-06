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
        boxSize={["45px", "55px", "65px", "75px, 100px"]}
        objectFit="none"
        borderRadius="lg"
        alt={songs[currIndex].snippet.title}
        src={songs[currIndex].snippet.thumbnails.default.url}
      />
      <Flex>
        <Heading
          ml={"1"}
          textAlign={"center"}
          width={"100%"}
          color={"var(--chakra-colors-red-600)"}
          className="songTitle"
          size={["sm", "sm", "md", "md", "md", "md"]}
          maxW={["60", "60", "60", "60", "60"]}
        >
          <Text noOfLines={["1", "1", "2", "2"]}>
            {songs[currIndex].snippet.title}
          </Text>
        </Heading>
      </Flex>
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
