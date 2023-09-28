import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlaylistUsed from './PlaylistUsed/PlaylistUsed';
import Search from './Search/Search';
import Navbar from '../Navbar/Navbar';
import HelmetHelper from '../Helmet/HelmetHelper';
import Footer from '../Footer/Footer';
import {
  setProgress,
  setPercentage,
  setSeekTo,
  setVideoDuration,
} from '../../redux/actions/playerActions';

function HomePage({ setProgress, setPercentage, setSeekTo, setVideoDuration }) {
  useEffect(() => {
    setProgress(0);
    setPercentage(0);
    setSeekTo(0);
    setVideoDuration(0);
  }, []);

  return (
    <div className="h-screen min-h-screen ">
      <HelmetHelper title="Playlist Randomizer - Shuffle Youtube Playlists up to 12000 videos" />
      <div className="transition-colors bg-backColor image:bg-[unset] flex flex-col justify-between h-screen min-h-screen mx-auto">
        <Navbar />
        <div className="w-11/12 h-1/5 flex-col flex  mx-auto md:max-w-[1600px]">
          <Search />
        </div>
        <PlaylistUsed />
        <Footer />
      </div>
    </div>
  );
}

HomePage.propTypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    currentSong: PropTypes.string.isRequired,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
  }).isRequired,
  setProgress: PropTypes.func.isRequired,
  setPercentage: PropTypes.func.isRequired,
  setSeekTo: PropTypes.func.isRequired,
  setVideoDuration: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  setProgress,
  setPercentage,
  setSeekTo,
  setVideoDuration,
};

const mapStateToProps = (state) => ({
  player: state.player,
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
