import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MersenneTwister from "mersenne-twister";
import { FixedSizeList } from "react-window";

import {
  currentSong,
  isShuffleActive,
  setVideoDuration,
} from "../../../redux/actions/playerActions";
import {
  lastPlayedIndexPlaylistDetails,
  setPlaylistImage,
  setPlaylistLength,
} from "../../../redux/actions/playlistDetailsActions";
import { addSongsByPlaylistID } from "../../../redux/actions/playlistSongsByIdActions";

function VideoCard({
  player,
  currentSong,
  playlistSongsById,
  addSongsByPlaylistID,
  isShuffleActive,
  playlistDetails,
  lastPlayedIndexPlaylistDetails,
  setPlaylistLength,
  setVideoDuration,
  width,
  height,
  setPlaylistImage,
}) {
  const listRef = React.createRef();

  const shuffleIsActive = () => {
    setVideoDuration(0);
    const generator = new MersenneTwister();
    const shuffleArr = [];
    shuffleArr.push(...playlistSongsById[player.currentActivePlaylistId]);

    for (let i = shuffleArr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(generator.random() * (i + 1));
      [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]];
    }
    const playlistObject = {
      id: player.currentActivePlaylistId,
      songs: shuffleArr,
    };
    addSongsByPlaylistID(playlistObject);
    currentSong(shuffleArr[0].snippet.resourceId.videoId);
    const lastPlayedObj = {
      currentIndex: 0,
      playlistId: player.currentActivePlaylistId,
    };
    lastPlayedIndexPlaylistDetails(lastPlayedObj);
    const obj = {
      playlistId: player.currentActivePlaylistId,
      playlistImage: `https://i.ytimg.com/vi/${shuffleArr[0].snippet.resourceId.videoId}/mqdefault.jpg`,
    };
    setPlaylistImage(obj);
    isShuffleActive(false);
  };

  useEffect(() => {
    if (player.isShuffleActive === true) {
      shuffleIsActive();
    }
  }, [player.isShuffleActive]);

  const handleClick = (index) => {
    const lastPlayedObj = {
      currentIndex: index,
      playlistId: player.currentActivePlaylistId,
    };
    lastPlayedIndexPlaylistDetails(lastPlayedObj);
    currentSong(
      playlistSongsById[player.currentActivePlaylistId][index]?.snippet
        .resourceId.videoId,
    );
    const obj = {
      playlistId: player.currentActivePlaylistId,
      playlistImage: `https://i.ytimg.com/vi/${
        playlistSongsById[player.currentActivePlaylistId][index].snippet
          .resourceId.videoId
      }/mqdefault.jpg`,
    };
    setPlaylistImage(obj);
  };

  useEffect(() => {
    const findPlaylistIndex = playlistDetails.findIndex(
      (element) => element.playlistId === player.currentActivePlaylistId,
    );
    listRef.current.scrollToItem(
      playlistDetails[findPlaylistIndex].currentIndex,
      "start",
    );
  }, [player.currentSong]);

  useEffect(() => {
    const playlistLengthObj = {
      playlistLength:
        playlistSongsById[player.currentActivePlaylistId].length - 1,
      playlistId: player.currentActivePlaylistId,
    };
    setPlaylistLength(playlistLengthObj);
  }, [playlistSongsById[player.currentActivePlaylistId]]);
  return (
    <div className="h-full w-full ">
      <FixedSizeList
        className="list"
        ref={listRef}
        width={width}
        height={height}
        itemCount={playlistSongsById[player.currentActivePlaylistId].length}
        itemSize={50}
      >
        {({ index, theKey, style }) => (
          <button
            type="button"
            className="w-full my-1"
            style={style}
            title={
              playlistSongsById[player.currentActivePlaylistId][index].snippet
                .title
            }
            // ref={refs[index]}
            id={`${
              playlistSongsById[player.currentActivePlaylistId][index].snippet
                .resourceId.videoId
            }`}
            onClick={() => handleClick(index)}
            // eslint-disable-next-line
            key={theKey}
          >
            <div
              className={`${
                player.currentSong ===
                playlistSongsById[player.currentActivePlaylistId][index].snippet
                  .resourceId.videoId
                  ? "border-b-secondary "
                  : null
              }  text-center  group`}
            >
              <div className=" flex justify-between group-hover:text-secondary ">
                <div
                  className={`${
                    player.currentSong ===
                    playlistSongsById[player.currentActivePlaylistId][index]
                      .snippet.resourceId.videoId
                      ? " text-secondary  font-semibold  "
                      : " text-textColor "
                  } font-normal w-full text-center md:text-left md:mx-4 md:truncate font-open`}
                >
                  <p className="truncate group-hover:text-secondary ">
                    {`${index + 1} - ${
                      playlistSongsById[player.currentActivePlaylistId][index]
                        .snippet.title
                    }`}
                  </p>
                  <p
                    className={`${
                      player.currentSong ===
                      playlistSongsById[player.currentActivePlaylistId][index]
                        .snippet.resourceId.videoId
                        ? " text-secondary  "
                        : "text-gray group-hover:text-secondary "
                    } truncate text-sm font-open `}
                  >
                    {
                      playlistSongsById[player.currentActivePlaylistId][index]
                        .snippet.videoOwnerChannelTitle
                    }
                  </p>
                </div>
              </div>
              <div
                className={`${
                  player.currentSong ===
                  playlistSongsById[player.currentActivePlaylistId][index]
                    .snippet.resourceId.videoId
                    ? " bg-secondary shadow-none"
                    : "bg-gray  "
                } w-[88%] h-0.5 mx-auto rounded-full group-hover:bg-secondary`}
              />
            </div>
          </button>
        )}
      </FixedSizeList>
    </div>
  );
}

VideoCard.propTypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    currentSong: PropTypes.string.isRequired,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
  }).isRequired,
  playlistDetails: PropTypes.arrayOf(
    PropTypes.shape({
      playlistName: PropTypes.string.isRequired,
      playlistId: PropTypes.string.isRequired,
      playlistImage: PropTypes.string.isRequired,
      playlistEtag: PropTypes.string.isRequired,
      currentIndex: PropTypes.number.isRequired,
    }),
  ).isRequired,
  currentSong: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  addSongsByPlaylistID: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  lastPlayedIndexPlaylistDetails: PropTypes.func.isRequired,
  setPlaylistLength: PropTypes.func.isRequired,
  setVideoDuration: PropTypes.func.isRequired,
  setPlaylistImage: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  currentSong,
  addSongsByPlaylistID,
  isShuffleActive,
  lastPlayedIndexPlaylistDetails,
  setPlaylistLength,
  setVideoDuration,
  setPlaylistImage,
};

const mapStateToProps = (state) => ({
  playlistSongsById: state.playlistSongsById,
  player: state.player,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
