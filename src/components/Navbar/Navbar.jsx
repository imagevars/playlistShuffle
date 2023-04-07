import React from "react";
// import Search from '../Search/Search'
import { useNavigate } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";

const Navbar = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const navigate = useNavigate();
  const handleClick = () => {
    return navigate(baseUrl);
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

export default Navbar;
