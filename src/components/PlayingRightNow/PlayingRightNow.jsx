import React, { memo } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const PlayingRightNow = ({ player, playlistSongsById }) => {
  const currentIndex = playlistSongsById[
    player.currentActivePlaylistId
  ]?.findIndex((ele) => {
    return ele.snippet.resourceId.videoId === player.currentSong;
  });
  return (
    <div>
      <div>
        <p className="songTitle text-white text-center lg:text-2xl truncate mx-auto w-[95%]">
          {
            playlistSongsById[player.currentActivePlaylistId][currentIndex]
              .snippet.title
          }
        </p>
      </div>
    </div>
  );
};

PlayingRightNow.proptypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    previousSong: PropTypes.string,
    currentSong: PropTypes.string.isRequired,
    nextSong: PropTypes.string,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive:PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
  }).isRequired,
  playlistSongsById: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => {
  return {
    playlistSongsById: state.playlistSongsById,
    player: state.player,
  };
};

export default connect(mapStateToProps, null)(memo(PlayingRightNow));
