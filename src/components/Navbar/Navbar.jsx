import React, { memo } from "react";
// import Search from '../Search/Search'
import { useNavigate } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";
import { connect } from "react-redux";
import {
  PLAYER_ISPLAYING,
  PLAYER_ISSHUFFLEACTIVE,
  PLAYER_CURRENTSONG,
  PLAYER_NEXTSONG,
  PLAYER_PREVIOUSSONG,
  PLAYER_SETCURRENTACTIVEPLAYLIST,
} from "../../constants/playerTypes";
const Navbar = ({isPlaying,
  previousSong,
  currentSong,
  nextSong,
  isShuffleActive,
  setcurrentActivePlaylistId,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    isPlaying(true);
    previousSong("");
    currentSong("");
    nextSong("");
    isShuffleActive(false);
    setcurrentActivePlaylistId("");
    return navigate("/");
  };
  return (
    <Flex className="navbar">
      <Heading
        cursor={"pointer"}
        onClick={handleClick}
        m={"0 auto"}
        color={"black"}
      >
        Playlist Shuffle{" "}
      </Heading>
    </Flex>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    isPlaying: (payload) => dispatch({ type: PLAYER_ISPLAYING, payload }),
    previousSong: (payload) => dispatch({ type: PLAYER_PREVIOUSSONG, payload }),
    currentSong: (payload) => dispatch({ type: PLAYER_CURRENTSONG, payload }),
    nextSong: (payload) => dispatch({ type: PLAYER_NEXTSONG, payload }),
    isShuffleActive: (payload) =>
      dispatch({ type: PLAYER_ISSHUFFLEACTIVE, payload }),
    setcurrentActivePlaylistId: (payload) =>
      dispatch({ type: PLAYER_SETCURRENTACTIVEPLAYLIST, payload }),
  };
};
export default connect(null, mapDispatchToProps)(Navbar);
