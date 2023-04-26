import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MersenneTwister from 'mersenne-twister';
import {
  currentSong,
  nextSong,
  previousSong,
  isShuffleActive,
} from '../../redux/actions/playerActions';
import { lastPlayedPlaylistDetails, playlistLength } from '../../redux/actions/playlistDetailsActions';
import { addSongsByPlaylistID } from '../../redux/actions/playlistSongsByIdActions';

function VideoCard({
  player,
  previousSong,
  currentSong,
  nextSong,
  playlistSongsById,
  addSongsByPlaylistID,
  isShuffleActive,
  playlistDetails,
  lastPlayedPlaylistDetails,
  playlistLength,
}) {
  const refs = playlistSongsById[player.currentActivePlaylistId]?.reduce(
    (acc, value) => {
      acc[value.snippet.resourceId.videoId] = React.createRef();
      return acc;
    },
    {},
  );

  useEffect(() => {
    refs[player.currentSong].current.scrollIntoView({
      block: 'start',
    });
  }, [player.currentSong]);
  useEffect(() => {
    if (player.rememberLastVideo) {
      const findPlaylistIndex = playlistDetails.findIndex((element) => {
        const index = element.playlistId === player.currentActivePlaylistId;
        return index;
      });
      currentSong(
        playlistSongsById[player.currentActivePlaylistId][
          playlistDetails[findPlaylistIndex].currentIndex
        ].snippet.resourceId.videoId,
      );
    } else {
      const unShuffleArr = [];
      unShuffleArr.push(...playlistSongsById[player.currentActivePlaylistId]);
      unShuffleArr.sort((a, b) => {
        const result = a.snippet.position - b.snippet.position;
        return result;
      });
      const playlistObject = {
        id: player.currentActivePlaylistId,
        songs: unShuffleArr,
      };
      addSongsByPlaylistID(playlistObject);
      currentSong(unShuffleArr[0].snippet.resourceId.videoId);
      nextSong(unShuffleArr[1].snippet.resourceId.videoId);
    }
  }, []);

  const shuffleIsActive = () => {
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
    nextSong(shuffleArr[1].snippet.resourceId.videoId);
    const lastPlayedObj = {
      currentIndex: 0,
      playlistId: player.currentActivePlaylistId,
    };
    lastPlayedPlaylistDetails(lastPlayedObj);
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
    lastPlayedPlaylistDetails(lastPlayedObj);
    previousSong(
      playlistSongsById[player.currentActivePlaylistId][index - 1]?.snippet
        .resourceId.videoId,
    );
    currentSong(
      playlistSongsById[player.currentActivePlaylistId][index]?.snippet
        .resourceId.videoId,
    );
    nextSong(
      playlistSongsById[player.currentActivePlaylistId][index + 1]?.snippet
        .resourceId.videoId,
    );
  };

  const videoList = playlistSongsById[player.currentActivePlaylistId]?.map(
    (ele, i) => (ele.snippet.title !== 'Private video'
      && ele.snippet.title !== 'Deleted video' ? (
        <button
          type="button"
          className="mx-2 my-1 cursor-pointer w-[97%] "
          title={ele.snippet.title}
          ref={refs[ele.snippet.resourceId.videoId]}
          id={`${ele.snippet.resourceId.videoId}`}
          onClick={() => handleClick(i)}
          // eslint-disable-next-line
          key={`${ele.snippet.resourceId.videoId}i${i}`}
        >
          <div
            className={`${
              player.currentSong === ele.snippet.resourceId.videoId
                ? 'bg-[#bb86fc]'
                : null
            }  overflow-hidden hover:bg-[#cca2ff] h-11 lg:h-14 rounded-sm`}
          >
            <div className="flex h-full">
              {/* <img
                loading="lazy"
                className="w-10  h-full object-cover rounded-l-sm "
                src={ele.snippet.thumbnails.default?.url}
                alt={`${ele.snippet.title}`}
              /> */}
              <div className="cardText flex flex-col items-baseline ml-1 ">
                <p className="text-white truncate  xl:text-lg  ">
                  {`${i + 1} - ${ele.snippet.title}`}
                </p>

                <p className="cardArtist text-white truncate xl:text-lg">
                  {ele.snippet.videoOwnerChannelTitle}
                </p>
              </div>
            </div>
          </div>
        </button>
      ) : null),
  );

  useEffect(() => {
    const playlistLengthObj = {
      playlistLength: videoList.length - 1,
      playlistId: player.currentActivePlaylistId,
    };
    playlistLength(playlistLengthObj);
  }, [playlistSongsById[player.currentActivePlaylistId]]);
  return (
    <div
      className="cardContainer h-[46vh] md:h-full"
    >
      <ul className="ulListCards mt-1 h-full md:mt-0  overflow-y-auto ">
        {videoList}
      </ul>
    </div>
  );
}

VideoCard.propTypes = {
  playlistDetails: PropTypes.arrayOf(
    PropTypes.shape({
      playlistName: PropTypes.string.isRequired,
      playlistId: PropTypes.string.isRequired,
      playlistImage: PropTypes.string.isRequired,
      playlistEtag: PropTypes.string.isRequired,
      currentIndex: PropTypes.number.isRequired,
    }),
  ).isRequired,
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    previousSong: PropTypes.string,
    currentSong: PropTypes.string.isRequired,
    nextSong: PropTypes.string,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
    rememberLastVideo: PropTypes.bool.isRequired,
  }).isRequired,
  currentSong: PropTypes.func.isRequired,
  nextSong: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  addSongsByPlaylistID: PropTypes.func.isRequired,
  previousSong: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  lastPlayedPlaylistDetails: PropTypes.func.isRequired,
  playlistLength: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  previousSong,
  currentSong,
  nextSong,
  addSongsByPlaylistID,
  isShuffleActive,
  lastPlayedPlaylistDetails,
  playlistLength,
};

const mapStateToProps = (state) => ({
  playlistSongsById: state.playlistSongsById,
  player: state.player,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
