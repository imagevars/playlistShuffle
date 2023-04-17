import React, { memo } from "react";
import { connect } from "react-redux";

const PlayingRightNow = memo(({ player, playlistSongsById }) => {
  const currentIndex = playlistSongsById[
    player.currentActivePlaylistId
  ]?.findIndex((ele) => {
    return ele.snippet.resourceId.videoId === player.currentSong;
  });
  return (
    <div>
      <div>
        <p className="songTitle text-white text-center lg:text-2xl truncate mx-auto w-[95%]">
          {
            playlistSongsById[player.currentActivePlaylistId][currentIndex].snippet.title
          }
        </p>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    playlistSongsById: state.playlistSongsById,
    songs: state.songs,
    player: state.player,
  };
};

export default connect(mapStateToProps, null)(PlayingRightNow);
