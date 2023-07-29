import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPercentage, setSeekTo, setSeeking } from '../../../redux/actions/playerActions';

function ProgressBar({ player, setSeekTo, setSeeking }) {
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

  const handleChange = (e) => {
    setSeekTo(String(e.target.value));
  };

  const handleMouseDown = () => {
    setSeeking(true);
  };

  const handleMouseUp = (e) => {
    setSeekTo(String(e.target.value));
    setSeeking(false);
  };

  return (
    <div className="flex justify-center">
      <div className="text-[#ffff] font-bold ">
        {secondsToTime(player.progress)}
      </div>
      <input
        type="range"
        className="w-3/4 "
        name="volume"
        id="volume"
        value={String(player.videoPercentage / 100)}
        min={0}
        onChange={(e) => handleChange(e)}
        max={0.99}
        step="any"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
      />
      <div className="text-[#ffff] font-bold ">
        {secondsToTime(player.videoDuration)}
      </div>
    </div>
  );

  //   <div className="flex justify-center">
  //    // <div className="text-[#ffff] font-bold ">
  //    //   {secondsToTime(player.progress)}
  //    // </div>
  //     <div className="w-2/3 md:w-4/5 bg-gray-500 rounded-full h-1.5  my-auto mx-1">
  //       <div
  //         style={{ width: `${player.videoPercentage}%`, maxWidth: '100%' }}
  //         className="bg-[#ffff] h-1.5 rounded-full  "
  //       >
  //         <div className="clear-both flex justify-end">
  //           <span className
  // ="w-3 h-3 mt-[-3px] -mr-2 float-right relative bg-white rounded-full" />
  //         </div>
  //       </div>
  //     </div>
  //     <div className="text-[#ffff] font-bold ">
  //       {secondsToTime(player.videoDuration)}
  //     </div>
  //   </div>
  // );
}

ProgressBar.propTypes = {
  player: PropTypes.shape({
    videoPercentage: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
    videoDuration: PropTypes.string.isRequired,
  }).isRequired,
  setSeekTo: PropTypes.func.isRequired,
  setSeeking: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = {
  setPercentage,
  setSeekTo,
  setSeeking,
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(ProgressBar));
