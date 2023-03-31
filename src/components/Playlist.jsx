import React from "react";
import { useParams } from "react-router-dom";
import Card from "./card/Card";
import MediaButtons from "./MediaButtons/MediaButtons";
import Player from "./Player/Player";
import PlayingRightNow from "./PlayingRightNow";
import Search from "./Search";

const Playlist = () => {
  const { id } = useParams();
  console.log("id  in playlist is", id);
  return (
    <div className="container">
      <div className="mainContent">
        <Player />
        <div className="playerContainer">
          <Card />
        </div>
      </div>
      <div>
      <PlayingRightNow />
      </div>
      <div className="mediaButtonsContainer">
        <MediaButtons />
      </div>
    </div>
  );
};

export default Playlist;
