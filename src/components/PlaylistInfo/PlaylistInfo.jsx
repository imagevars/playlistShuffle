import React, { useEffect, useState, memo, useMemo } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
const PlaylistInfo = ({ playlistDetails }) => {
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
};

PlaylistInfo.propTypes = {
  playlistDetails: PropTypes.arrayOf(
    PropTypes.shape({
      playlistName: PropTypes.string.isRequired,
      playlistId: PropTypes.string.isRequired,
      playlistImage: PropTypes.string.isRequired,
      playlistEtag: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    playlistDetails: state.playlistDetails,
  };
};

export default connect(mapStateToProps, null)(memo(PlaylistInfo));
