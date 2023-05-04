import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

function HelmetHelper({ title }) {
  return (
    <Helmet
      defaultTitle="Shuffle Youtube Playlists - Playlist Randomizer"
      title={title}
      defer={false}
    />
  );
}

HelmetHelper.propTypes = {
  title: PropTypes.string.isRequired,
};

export default memo(HelmetHelper);
