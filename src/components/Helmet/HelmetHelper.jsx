import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

function HelmetHelper({ title }) {
  return (
    <Helmet
      defaultTitle="Playlist Randomizer - Shuffle Youtube Playlists up to 12000 videos"
      title={title}
      defer={false}
    />
  );
}

HelmetHelper.propTypes = {
  title: PropTypes.string.isRequired,
};

export default memo(HelmetHelper);
