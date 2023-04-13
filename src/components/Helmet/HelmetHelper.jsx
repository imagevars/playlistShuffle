import React from "react";
import { Helmet } from "react-helmet-async";

const HelmetHelper = ({ title }) => {
  return (
    <Helmet
      defaultTitle="Paylist Shuffle - The randomizer of your playlists"
      title={title}
      defer={false}
    />
  );
};

export default HelmetHelper;
