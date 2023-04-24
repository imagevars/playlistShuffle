import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPercentage } from '../../redux/actions/playerActions';

function ProgressBar({ player }) {
  const secondsToTime = (e) => {
    const h = Math.floor(e / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(e % 60)
      .toString()
      .padStart(2, '0');

    return h === '00' ? `${m}:${s}` : `${h}:${m}:${s}`;
  };

  return (
    <div>
      <div className="w-[65%] bg-gray-200 mx-auto rounded-full h-1.5 mb-4 dark:bg-[#e6dfeb]">
        <div
          style={{ width: `${player.videoPercentage}%`, maxWidth: '100%' }}
          className="bg-[#624aa0] h-1.5 rounded-full dark:bg-[#624aa0] "
        />
        <div className="flex justify-between">
          <div className="text-[#624aa0] font-bold ">{secondsToTime(player.progress)}</div>
          <div className="text-[#624aa0] font-bold ">{secondsToTime(player.videoDuration)}</div>
        </div>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  player: PropTypes.shape({
    videoPercentage: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
    videoDuration: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = {
  setPercentage,
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(ProgressBar));
