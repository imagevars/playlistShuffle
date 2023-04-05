import React from "react";
import Card from "../Card/Card";
import MediaButtons from "../MediaButtons/MediaButtons";
import Player from "../Player/Player";
import PlayingRightNow from "../PlayingRightNow/PlayingRightNow";
import Navbar from "../Navbar/Navbar";
import { Flex, Container, Box } from "@chakra-ui/react";
import PlaylistInfo from "../PlaylistInfo/PlaylistInfo";

const PlaylistPage = () => {
  return (
    <Container className="container" w="100%" maxWidth="1866px">
      <Navbar />

      <Flex mb={"1.5"}>
        <PlaylistInfo />
      </Flex>

      <Box
        w={["95%", null, null, "85%"]}
        m={"0 auto"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Flex
          className="mainContent"
          h={ [null,null, null, "2xl", "2xl", "2xl"] }
          maxH={"1900px"}
          flexDirection={["column", "column", "row"]}
          alignItems={  ["center","center","center","inherit"]  }
          w={"100%"}
        >
          <Box w={["90%", "90%", null, "40%"]} h={ ["30vh","30vh","95%"] } maxH={"1900px"}>
            <Player />
          </Box>
          <Box mt={["10px","10px", null, null]} w={["100%", "100%", null, "50%"]} h={  ["35vh","35vh","35vh", "80%"]  } maxH={"1900px"}>
            <Card />
          </Box>
        </Flex>
        <Box
          minW={"100%"}
          position={"fixed"}
          bottom={"0"}
          bg={"red.100"}
          className="bottomMedia"
          display={"flex"}
          flexDirection={["column", "column", "column", "column"]}
        >
          <Flex justify={"center"}>
            <PlayingRightNow />
          </Flex>
          <footer>

          <Flex justify={"center"} className="mediaButtonsContainer">
            <MediaButtons />
          </Flex>
          </footer>
        </Box>
      </Box>
    </Container>
  );
};

export default PlaylistPage;
