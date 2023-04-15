import React from "react";
import PlaylistUsed from "../PlaylistUsed/PlaylistUsed";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    return navigate("/");
  };
  return (
    <div
      // h="calc(100vh)" w="100%" maxWidth="2266px"
      className="min-h-screen bg-slate-800"
    >
      <div className=" align-middle bg-red-300 w-10/12 flex  mx-auto" >
        <div
        className="w-full"
        //  w="85%" m={"0 auto"}
        >
          <h1
            onClick={handleClick}
            // cursor={"pointer"}
            // color={"black"}
            className="text-3xl text-center text-white font-bold cursor-pointer"
          >
            Playlist Shuffle
          </h1>
          <div className="mt-16 mb-10   ">
            <Search />
          </div>

          <div className="mb-5">
            <PlaylistUsed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
