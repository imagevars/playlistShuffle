import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react';
import HomePage from './components/HomePage/HomePage';
import PlaylistPage from './components/PlaylistPage/PlaylistPage';
import './app.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import AboutPage from './components/AboutPage/AboutPage';

function App({ player }) {
  useEffect(() => {
    if (player.theme === 'image' && player.currentSong !== '') {
      document.getElementById('app').style.backgroundImage = `url(https://i.ytimg.com/vi/${player.currentSong}/hqdefault.jpg)`;
      document.getElementById('app').style.backgroundBlendMode = 'multiply';
      document.getElementById('app').style.backgroundSize = 'cover';
      document.getElementById('app').style.backgroundPosition = 'center';
      document.getElementById('app').style.transition = '650ms';
      document.getElementById('app').style.backgroundColor = '#404040';
    }
  }, [player.currentSong]);

  useEffect(() => {
    if (player.theme === 'image' && player.currentSong !== '') {
      document.getElementById('app').style.backgroundImage = `url(https://i.ytimg.com/vi/${player.currentSong}/hqdefault.jpg)`;
      document.getElementById('app').style.backgroundBlendMode = 'multiply';
      document.getElementById('app').style.backgroundSize = 'cover';
      document.getElementById('app').style.backgroundPosition = 'center';
      document.getElementById('app').style.transition = '500ms';
      document.getElementById('app').style.backgroundColor = '#404040';
    } else {
      document.getElementById('app').style.backgroundColor = '#404040';
      document.getElementById('app').style.backgroundImage = 'none';
    }
  }, [player.theme]);
  return (
    <div id="app">
      <div className="backdrop-blur-sm">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/:id" element={<PlaylistPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Analytics />
      </div>
    </div>
  );
}
App.propTypes = {
  player: PropTypes.shape({
    currentSong: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
  }).isRequired,

};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, null)(App);
