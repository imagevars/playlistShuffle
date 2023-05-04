import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlaylistUsed from './PlaylistUsed/PlaylistUsed';
import Search from './Search/Search';
import Navbar from '../Navbar/Navbar';
import HelmetHelper from '../Helmet/HelmetHelper';
import { rememberLastVideo } from '../../redux/actions/playerActions';
import { lastPlayedPlaylistDetailsAll } from '../../redux/actions/playlistDetailsActions';

function HomePage({ rememberLastVideo, player, lastPlayedPlaylistDetailsAll }) {
  const handleChange = () => {
    if (!player.rememberLastVideo) {
      rememberLastVideo(true);
    } else {
      rememberLastVideo(false);
      lastPlayedPlaylistDetailsAll();
    }
  };
  return (
    <div className="min-h-screen  bg-[#f2e7fe] ">
      <HelmetHelper
        title="Shuffle Youtube Playlists - Playlist Randomizer"
      />
      <div className="w-[95%] md:max-w-[2200px] mx-auto">
        <Navbar />
      </div>
      <div className=" align-middle  w-10/12 flex  mx-auto">
        <div className="w-full">
          <div className="mt-20 mb-10   ">
            <Search />
          </div>
          <div className="w-11/12 mx-auto">
            <label htmlFor="checkBox_" className="text-black text-lg ml-1">
              <input
                type="checkbox"
                id="checkBox_"
                checked={player.rememberLastVideo}
                onChange={() => handleChange()}
              />
              Remember last video played
            </label>
          </div>
          <div className="mb-5">
            <PlaylistUsed />
          </div>
        </div>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    previousSong: PropTypes.string,
    currentSong: PropTypes.string.isRequired,
    nextSong: PropTypes.string,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
    rememberLastVideo: PropTypes.bool.isRequired,
  }).isRequired,
  rememberLastVideo: PropTypes.func.isRequired,
  lastPlayedPlaylistDetailsAll: PropTypes.func.isRequired,

};
const mapDispatchToProps = {
  rememberLastVideo,
  lastPlayedPlaylistDetailsAll,
};

const mapStateToProps = (state) => ({
  player: state.player,
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
