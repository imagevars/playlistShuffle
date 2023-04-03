import React from "react";
import Card from "./Card/Card";
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
      <div className="bottomMedia">

      <div>
      <PlayingRightNow />
      </div>
      <div className="mediaButtonsContainer">
        <MediaButtons />
      </div>
      </div>
    </div>
    </div>
  );
};

export default PlaylistPage;
