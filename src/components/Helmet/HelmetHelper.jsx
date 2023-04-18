import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
const HelmetHelper = ({ title }) => {
  return (
    <Helmet
      defaultTitle="Paylist Shuffle - The randomizer of your playlists"
      title={title}
      defer={false}
    />
  );
};

HelmetHelper.propTypes = {
  title: PropTypes.string,
};

export default memo(HelmetHelper);
