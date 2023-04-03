import React from "react";
import PlaylistUsed from "../PlaylistUsed";
import Search from "../Search";

const HomePage = () => {
  return (
    <div className="homeContainer">
      <div className="contentContaier">

      <div className="home">
        <h1 className="title">Playlist Shuffle</h1>
        <Search />
      </div>
      <div className="playlistInHomePage">
        <PlaylistUsed />
      </div>
      </div>
    </div>
  );
};

export default HomePage;
