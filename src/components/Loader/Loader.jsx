import React from "react";
import { Spinner } from "@chakra-ui/react";

function Loader({size }) {
  return <Spinner size={size}   />;
}

export default Loader;
