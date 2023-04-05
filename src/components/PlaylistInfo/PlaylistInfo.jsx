import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Flex, Heading, Image } from "@chakra-ui/react";
const PlaylistInfo = ({ playlistDetails }) => {
  const { id } = useParams();
  const [playlistInfo, setPlaylistInfo] = useState({
    name: "",
    image: "",
  });
  useEffect(() => {
    const info = playlistDetails?.find((ele) => ele.playlistId === id);
    setPlaylistInfo({
      name: info.playlistName,
      image: info.PlaylistImage,
    });
  }, []);

  return (
    <Flex alignItems={"center"}>
      <Image
        boxSize={["45px", "60px", "80px"]}
        objectFit="cover"
        borderRadius="full"
        src={playlistInfo.image}
      />
      <Heading ml={"1"} size={["sm", "md", "md", "md"]}>
        {playlistInfo.name}
      </Heading>
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    player: state.player,
    playlistDetails: state.playlistDetails,
  };
};
export default connect(mapStateToProps, null)(PlaylistInfo);
