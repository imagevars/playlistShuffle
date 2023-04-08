import React from "react";
import PlaylistUsed from "../PlaylistUsed/PlaylistUsed";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";
import { Container, Heading, Box, Center } from "@chakra-ui/react";
const HomePage = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const navigate = useNavigate();
  const handleClick = () => {
    

    return navigate(baseUrl);
  };
  return (
    <Container h="calc(100vh)" w="100%" maxWidth="2266px" bg="whiteAlpha.900">
      <Box w="85%" m={"0 auto"}>
        <Heading onClick={handleClick} cursor={"pointer"} color={"black"} className="title">
          {" "}
          <Center>Playlist Shuffle</Center>
        </Heading>
        <Box>
          <Search />
        </Box>

        <Box>
          <PlaylistUsed />
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
