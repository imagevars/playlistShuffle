import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BiVolumeMute,
  BiVolumeLow,
  BiVolumeFull,
} from 'react-icons/bi';
import { isMutedActive, setVolume } from '../../../redux/actions/playerActions';

function VolumeManager({ player, isMutedActive, setVolume }) {
  const handleIconClick = () => {
    if (player.isMutedActive === true) {
      isMutedActive(false);
    } else {
      isMutedActive(true);
    }
  };

  const handleChange = (e) => {
    isMutedActive(false);
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="text-[#ffff] w-full font-bold items-center  flex lg:flex md:w-1/4">
      { (player.volume >= 0.50 && player.isMutedActive === false)
      && (<BiVolumeFull size={35} onClick={handleIconClick} />)}
      { (player.volume < 0.50 && player.isMutedActive === false)
      && (<BiVolumeLow size={35} onClick={handleIconClick} />)}
      { player.isMutedActive === true && (<BiVolumeMute size={35} onClick={handleIconClick} />)}
      <input
        type="range"
        className="w-full md:w-3/4"
        name="volume"
        id="volume"
        value={player.volume}
        min={0}
        onChange={(e) => handleChange(e)}
        max={1}
        step="any"
      />
    </div>

  );
}

VolumeManager.propTypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    currentSong: PropTypes.string.isRequired,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
    rememberLastVideo: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
  }).isRequired,
  isMutedActive: PropTypes.func.isRequired,
  setVolume: PropTypes.func.isRequired,

};

const mapDispatchToProps = {
  isMutedActive,
  setVolume,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(VolumeManager);
