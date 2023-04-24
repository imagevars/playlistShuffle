import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

function HelmetHelper({ title }) {
  return (
    <Helmet
      defaultTitle="Playlist Shuffle - The randomizer of your playlists"
      title={title}
      defer={false}
    />
  );
}

HelmetHelper.propTypes = {
  title: PropTypes.string.isRequired,
};

export default memo(HelmetHelper);
