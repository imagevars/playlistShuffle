import React from "react";
import PlaylistUsed from "../PlaylistUsed/PlaylistUsed";
import Search from "../Search/Search";
import Navbar from "../Navbar/Navbar";
import HelmetHelper from "../Helmet/HelmetHelper";
import { rememberLastVideo } from "../../redux/actions/playerActions";
import { lastPlayedPlaylistDetailsAll } from "../../redux/actions/playlistDetailsActions";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
const HomePage = ({rememberLastVideo, player, lastPlayedPlaylistDetailsAll}) => {
const  handleChange = () => {
    if(!player.rememberLastVideo){
    rememberLastVideo(true)
  } else {
    rememberLastVideo(false)
    lastPlayedPlaylistDetailsAll()

  }}
  return (
    <div className="min-h-screen bg-[#121212]">
      <HelmetHelper
        title={"Paylist Shuffle - The randomizer of your playlists"}
      />
      <div className=" align-middle  w-10/12 flex  mx-auto">
        <div className="w-full">
          <Navbar />
          <div className="mt-20 mb-10   ">
            <Search />
          </div>
          <div className="w-11/12 mx-auto">
            <input type="checkbox" id="checkBox_" checked={player.rememberLastVideo} onChange={() => handleChange()}/>
            <label htmlFor="checkBox_" className="text-white text-lg ml-1">Remember last video played</label>
          </div>
          <div className="mb-5">
            <PlaylistUsed />
          </div>
        </div>
      </div>
    </div>
  );
};

HomePage.proptypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    previousSong: PropTypes.string,
    currentSong: PropTypes.string.isRequired,
    nextSong: PropTypes.string,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
    rememberLastVideo: PropTypes.bool.isRequired
  }).isRequired,
  rememberLastVideo: PropTypes.func.isRequired
}
const mapDispatchToProps = {
  rememberLastVideo: rememberLastVideo,
  lastPlayedPlaylistDetailsAll: lastPlayedPlaylistDetailsAll
};


const mapStateToProps = (state) => {
  return {
    player: state.player,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
