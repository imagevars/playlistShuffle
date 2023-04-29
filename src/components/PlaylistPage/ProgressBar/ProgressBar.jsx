import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPercentage } from '../../../redux/actions/playerActions';

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
    <div className="flex justify-center">
      <div className="text-[#ffff] font-bold ">
        {secondsToTime(player.progress)}
      </div>
      <div className="w-2/3 md:w-4/5 bg-gray-500 rounded-full h-1.5  my-auto mx-1">
        <div
          style={{ width: `${player.videoPercentage}%`, maxWidth: '100%' }}
          className="bg-[#ffff] h-1.5 rounded-full  "
        />
      </div>
      <div className="text-[#ffff] font-bold ">
        {secondsToTime(player.videoDuration)}
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
