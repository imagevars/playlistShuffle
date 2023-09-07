import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function PlayingRightNow({ player }) {
  return (
    <div className="md:flex  md:w-1/5 ">

      <div className="md:text-clip md:w-full">
        <p className="songTitle text-bgBlack font-semibold dark:font-semibold dark:text-bgWhite text-center md:text-left text-base lg:text-md truncate tracking-wide  mx-auto w-[95%] mt-2 md:mt-0 font-open">
          {
          player.artist
            ? (
              <a
                href={`https://www.google.com/search?q=${player.title} ${player.artist} lyrics`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {player.title}
              </a>
            ) : (''
            )
          }
        </p>
        <p className="songTitle text-gray dark:text-clearGray font-normal tracking-wide text-center md:text-left  lg:text-md truncate font-open mx-auto w-[95%]">
          {
          player.artist
            ? (
              <a
                href={`https://www.youtube.com/results?search_query=${player.artist}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {player.artist}
              </a>
            ) : (''
            )
          }
        </p>

      </div>
    </div>
  );
}

PlayingRightNow.propTypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    currentSong: PropTypes.string.isRequired,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  playlistSongsById: state.playlistSongsById,
  player: state.player,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, null)(memo(PlayingRightNow));
