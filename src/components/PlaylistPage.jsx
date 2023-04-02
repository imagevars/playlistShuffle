import React from "react";
import Card from "./card/Card";
import MediaButtons from "./MediaButtons/MediaButtons";
import Player from "./Player/Player";
import PlayingRightNow from "./PlayingRightNow";
import Navbar from './Navbar'

const PlaylistPage = () => {
  return (
    <div>

    <header>
    <Navbar/>    
    </header>
    <div className="container">
      <div className="mainContent">
        <Player />
          <Card />
      </div>
      <div>
      <PlayingRightNow />
      </div>
      <div className="mediaButtonsContainer">
        <MediaButtons />
      </div>
    </div>
    </div>
  );
};

export default PlaylistPage;
