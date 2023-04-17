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
          className="mx-2 my-1 cursor-pointer  "
          title={ele.snippet.title}
          ref={refs[ele.snippet.resourceId.videoId]}
          id={`${ele.snippet.resourceId.videoId}`}
          onClick={() => handleClick(ele.snippet.resourceId.videoId)}
          key={ele.snippet.resourceId.videoId + "index" + i}
        >
          <div
            className={`${
              player.currentSong === ele.snippet.resourceId.videoId
                ? "bg-[#bb86fc]"
                : null
            }  overflow-hidden hover:bg-[#bb86fc] h-11 lg:h-14 rounded-sm`}
          >
            <div className="flex h-full">
              <img
                loading="lazy"
                className="w-10  h-full object-cover rounded-l-sm"
                src={ele.snippet.thumbnails.default?.url}
                alt="song image"
              />
              <div className="cardText">
                <p className="text-white truncate w-full xl:text-lg">
                  {ele.snippet.title}
                </p>

                <p className="cardArtist text-white truncate xl:text-lg">
                  {ele.snippet.videoOwnerChannelTitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null
  );
  return (
    <div passive="true" className="cardContainer h-[46vh]">
      <ul className="ulListCards mt-1 h-full  overflow-y-auto ">{song}</ul>
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
