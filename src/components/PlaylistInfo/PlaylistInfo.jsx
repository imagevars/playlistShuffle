import React, { useEffect, useState, memo, useMemo } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const PlaylistInfo = memo(function ({ playlistDetails }) {
  const { id } = useParams();
  const [playlistInfo, setPlaylistInfo] = useState({
    name: "",
    image: "",
  });

  const info = useMemo(() => {
    return playlistDetails?.find((ele) => ele.playlistId === id);
  }, [playlistDetails, id]);

  useEffect(() => {
    setPlaylistInfo({
      name: info?.playlistName,
      image: info?.playlistImage,
    });
  }, [info]);

  return (
    <div className="flex my-2">
      <img
        className="w-9 h-9 rounded-sm"
        src={playlistInfo.image}
        alt={playlistInfo.name}
      />
      <p className="text-white">{playlistInfo.name}</p>
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
