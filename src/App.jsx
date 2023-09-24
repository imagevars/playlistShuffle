import React, { useEffect, useRef } from 'react';
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
  const ref = useRef(null);
  useEffect(() => {
    if (player.theme === 'image') {
      if (player.currentSong === '') {
        ref.current.style.backgroundColor = '#404040';
        ref.current.style.backgroundImage = 'none';
        ref.current.style.transition = 'background 700ms ease-in-out 150ms';
      } else {
        ref.current.style.transition = 'background 700ms ease-in-out 150ms';
        ref.current.style.backgroundImage = `url(https://i.ytimg.com/vi/${player.currentSong}/hqdefault.jpg)`;
        ref.current.style.backgroundBlendMode = 'multiply';
        ref.current.style.backgroundSize = 'cover';
        ref.current.style.backgroundPosition = 'center';
        ref.current.style.backgroundColor = '#404040';
      }
    }
  }, [player.currentSong]);

  useEffect(() => {
    if (player.theme === 'image' && player.currentSong !== '') {
      ref.current.style.transition = 'background 700ms ease-in-out 150ms';
      ref.current.style.backgroundImage = `url(https://i.ytimg.com/vi/${player.currentSong}/hqdefault.jpg)`;
      ref.current.style.backgroundBlendMode = 'multiply';
      ref.current.style.backgroundSize = 'cover';
      ref.current.style.backgroundPosition = 'center';
      ref.current.style.backgroundColor = '#404040';
    } else {
      ref.current.style.backgroundColor = '#404040';
      ref.current.style.backgroundImage = 'none';
    }
  }, [player.theme]);
  return (
    <div ref={ref} id="app">
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
