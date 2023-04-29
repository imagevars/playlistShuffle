import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function PlayingRightNow({ player, playlistSongsById, playlistDetails }) {
  const findPlaylistIndex = playlistDetails.findIndex((element) => element.playlistId
  === player.currentActivePlaylistId);

  return (
    <div className="md:flex md:self-center">

      <div className="md:text-clip md:w-full">
        <p className="songTitle text-[#ffff]  font-bold text-center md:text-left  lg:text-md truncate md:truncate-unset  mx-auto w-[95%]">
          {playlistDetails[findPlaylistIndex].currentIndex + 1}
          {' - '}
          {playlistSongsById[player.currentActivePlaylistId][playlistDetails[findPlaylistIndex]
            .currentIndex].snippet.title}
        </p>

      </div>
    </div>
  );
}

PlayingRightNow.propTypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    previousSong: PropTypes.string,
    currentSong: PropTypes.string.isRequired,
    nextSong: PropTypes.string,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
  }).isRequired,
  playlistDetails: PropTypes.arrayOf(PropTypes.shape({
    playlistName: PropTypes.string.isRequired,
    playlistId: PropTypes.string.isRequired,
    playlistImage: PropTypes.string.isRequired,
    playlistEtag: PropTypes.string.isRequired,
    currentIndex: PropTypes.number.isRequired,

  })).isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
};
const mapStateToProps = (state) => ({
  playlistSongsById: state.playlistSongsById,
  player: state.player,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, null)(memo(PlayingRightNow));
