import React, { useEffect, useState, memo, useMemo } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const PlaylistInfo = memo(function ({ playlistDetails })  {
  const { id } = useParams();
  const [playlistInfo, setPlaylistInfo] = useState({
    name: "",
    image: "",
  });



  const info = useMemo(() => {
    return playlistDetails?.find((ele) => ele.playlistId === id);
  }, [playlistDetails, id]);

  useEffect(() => {
    console.log("re render")

    setPlaylistInfo({
      name: info?.playlistName,
      image: info?.PlaylistImage,
    });
  }, [info]);

  return (
    <div
    //  alignItems={"center"}
     >
      <img
        // boxSize={["35px", "40px", "45px", "60px"]}
        // objectFit="cover"
        // borderRadius="lg"
        src={playlistInfo.image}
        alt={playlistInfo.name}
      />
      <p
        // ml={"1"}
        // noOfLines={["1", "1", "2", "2"]}
        // size={["sm", "sm", "md", "md"]}
      >
        {playlistInfo.name}
      </p>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    player: state.player,
    playlistDetails: state.playlistDetails,
  };
};

export default connect(mapStateToProps, null)(memo(PlaylistInfo));