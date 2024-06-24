import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

function HelmetHelper({ percentage, title }) {
  return (
    <Helmet
      defaultTitle="Playlist Randomizer - Shuffle Youtube Playlists up to 12000 videos"
      title={`${percentage ? `${percentage}%` : ''} ${title}`}
      defer={false}
    />
  );
}

HelmetHelper.propTypes = {
  title: PropTypes.string.isRequired,
  percentage: PropTypes.number,
};

HelmetHelper.defaultProps = {
  percentage: 0,
};

export default memo(HelmetHelper);
