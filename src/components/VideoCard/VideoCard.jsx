import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  PLAYER_CURRENTSONG,
  PLAYER_NEXTSONG,
  PLAYER_PREVIOUSSONG,
} from "../../constants/playerTypes";
import { PLAYLISTSONGS_ADDSONGSBYPLAYLISTID } from "../../constants/playlistSongsByIdTypes";
import MersenneTwister from "mersenne-twister";

const VideoCard = ({
  player,
  previousSong,
  currentSong,
  nextSong,
  playlistSongsById,
  addSongsByPlaylistID,
}) => {
  const refs = playlistSongsById[player.currentActivePlaylistId]?.reduce(
    (acc, value) => {
      acc[value.snippet.resourceId.videoId] = React.createRef();
      return acc;
    },
    {}
  );


  useEffect(() => {
    refs[player.currentSong].current.scrollIntoView({
      block: "start",
    });
  }, [player.currentSong]);

  useEffect(() => {
    shuffleisActive();
  }, [player.isShuffleActive]);

  const shuffleisActive = () => {
    if (player.isShuffleActive === true) {
      const generator = new MersenneTwister();
      let shuffleArr = [];
      shuffleArr.push(...playlistSongsById[player.currentActivePlaylistId]);

      for (let i = shuffleArr.length - 1; i > 0; i--) {
        const j = Math.floor(generator.random() * (i + 1));
        [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]];
      }
      const playlistObject = {
        id: player.currentActivePlaylistId,
        songs: shuffleArr,
      };
      addSongsByPlaylistID(playlistObject);

      currentSong(shuffleArr[0].snippet.resourceId.videoId);
      nextSong(shuffleArr[1].snippet.resourceId.videoId);
    } else {
      let unShuffleArr = [];
      unShuffleArr.push(...playlistSongsById[player.currentActivePlaylistId]);
      unShuffleArr.sort(function (a, b) {
        return a.snippet.position - b.snippet.position;
      });
      const playlistObject = {
        id: player.currentActivePlaylistId,
        songs: unShuffleArr,
      };
      addSongsByPlaylistID(playlistObject);
      currentSong(unShuffleArr[0].snippet.resourceId.videoId);
      nextSong(unShuffleArr[1].snippet.resourceId.videoId);
    }
  };

  const handleClick = (id) => {
    const currIndex = playlistSongsById[
      player.currentActivePlaylistId
    ].findIndex((ele) => {
      return ele.snippet?.resourceId.videoId === id;
    });
    previousSong(
      playlistSongsById[player.currentActivePlaylistId][currIndex - 1]?.snippet
        .resourceId.videoId
    );
    currentSong(
      playlistSongsById[player.currentActivePlaylistId][currIndex]?.snippet
        .resourceId.videoId
    );
    nextSong(
      playlistSongsById[player.currentActivePlaylistId][currIndex + 1]?.snippet
        .resourceId.videoId
    );
  };

  const song = playlistSongsById[player.currentActivePlaylistId]?.map(
    (ele, i) =>
      ele.snippet.title !== "Private video" &&
      ele.snippet.title !== "Deleted video" ? (
        <div
          // borderRadius="lg"
          // w={["95%", "90%"]}
          // cursor={"pointer"}
          title={ele.snippet.title}
          // m={"2"}
          ref={refs[ele.snippet.resourceId.videoId]}
          id={`${ele.snippet.resourceId.videoId}`}
          onClick={() => handleClick(ele.snippet.resourceId.videoId)}
          key={ele.snippet.resourceId.videoId + "index" + i}
        >
          <div
            // borderRadius="lg"
            // bg={
            //   player.currentSong === ele.snippet.resourceId.videoId
            //     ? "var(--chakra-colors-red-600)"
            //     : null
            // }
            // color={
            //   player.currentSong === ele.snippet.resourceId.videoId
            //     ? "white"
            //     : ""
            // }
            // _hover={{
            //   background: "var(--chakra-colors-red-600)",
            //   color: "white",
            // }}
          >
            <div>
              <img
                // loading="lazy"
                // borderRadius="lg"
                src={ele.snippet.thumbnails.default?.url}
                alt="song image"
                // boxSize={["40px", "40px", "65px"]}
                // objectFit="none"
              />
              <div 
              // ml={"1"} 
              className="cardText">
                <p 
                // size={["xs", "xs", "sm", "md"]}>
                //   <Text noOfLines={[1, 1, 2, 2]}
                >
                    {ele.snippet.title}
                </p>

                <p 
                className="cardArtist">
                  {ele.snippet.videoOwnerChannelTitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null
  );
  return (
    <div
      passive="true"
      className="cardContainer"
      // mt={["0", "4", "0", "0", "0"]}
      // overflowY={"scroll"}
      // h={["37vh", "37vh", "100%", "95%", "100%"]}
    >
      <ul
        // h={"100%"}
        // pt={"1"}
        // w={["95%", "95%", "95%", null, "100%"]}
        // margin={["0 auto", "0 auto", "0 auto", null]}
        className="ulListCards"
      >
        {song}
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    previousSong: (payload) => dispatch({ type: PLAYER_PREVIOUSSONG, payload }),
    currentSong: (payload) => dispatch({ type: PLAYER_CURRENTSONG, payload }),
    nextSong: (payload) => dispatch({ type: PLAYER_NEXTSONG, payload }),
    addSongsByPlaylistID: (payload) =>
      dispatch({ type: PLAYLISTSONGS_ADDSONGSBYPLAYLISTID, payload }),
  };
};

const mapStateToProps = (state) => {
  return {
    playlistSongsById: state.playlistSongsById,
    songs: state.songs,
    player: state.player,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
