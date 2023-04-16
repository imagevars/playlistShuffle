import React, { memo } from "react";
import { connect } from "react-redux";

const PlayingRightNow = memo(({ player, playlistSongsById }) => {
  const currentIndex = playlistSongsById[
    player.currentActivePlaylistId
  ]?.findIndex((ele) => {
    return ele.snippet.resourceId.videoId === player.currentSong;
  });
  return (
    <div
    //  mt={"1"} alignItems={"center"}
     >
      {/* <img
        // boxSize={["35px", "35px", "45px", "75px, 100px"]}
        // objectFit="none"
        // borderRadius="lg"
        alt={
          playlistSongsById[player.currentActivePlaylistId][currentIndex]
            ?.snippet.title
        }
        src={
          playlistSongsById[player.currentActivePlaylistId][currentIndex]
            ?.snippet.thumbnails.default.url
        }
      /> */}
      <div>
        <p
          // ml={"1"}
          // textAlign={"center"}
          // width={"100%"}
          // color={"var(--chakra-colors-red-600)"}
          className="songTitle text-white text-center truncate"
          // size={["sm", "sm", "md", "md", "md", "md"]}
          // maxW={["60", "60", "60", "60", "60"]}
        >
          {/* <Text noOfLines={["1", "1", "2", "2"]}> */}
            {
              playlistSongsById[player.currentActivePlaylistId][currentIndex]
                .snippet.title
            }
          {/* </Text> */}
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