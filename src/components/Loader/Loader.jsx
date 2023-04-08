import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

function Loader() {
  return (
    <Container>
      <Flex>
        <Spinner />
      </Flex>
    </Container>
  );
}

export default Loader;
