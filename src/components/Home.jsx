import React from "react";
import PlaylistUsed from "./PlaylistUsed";
import Search from "./Search";

const Home = () => {
  return (
    <div className="home">
      <h1>Playlist Shuffle</h1>
      <Search />
      <PlaylistUsed />
    </div>
  );
};

export default Home;
