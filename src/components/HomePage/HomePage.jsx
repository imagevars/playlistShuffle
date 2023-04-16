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
    <div className="min-h-screen bg-slate-800">
      <div className=" align-middle  w-10/12 flex  mx-auto">
        <div className="w-full">
          <h1
            onClick={handleClick}
            className="text-4xl text-center text-white font-bold cursor-pointer"
          >
            Playlist Shuffle
          </h1>
          <div className="mt-20 mb-10   ">
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
