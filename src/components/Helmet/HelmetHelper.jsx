import React from "react";
import { Helmet } from "react-helmet-async";

const HelmetHelper = ({ title }) => {
  return (
    <Helmet
      defaultTitle="Paylist Shuffle | randomize your playlist"
      title={title}
      defer={false}
    />
  );
};

export default HelmetHelper;
