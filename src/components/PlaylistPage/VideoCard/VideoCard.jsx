import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MersenneTwister from 'mersenne-twister';
import {
  currentSong,
  isShuffleActive,
} from '../../../redux/actions/playerActions';
import { lastPlayedPlaylistDetails, playlistLength } from '../../../redux/actions/playlistDetailsActions';
import { addSongsByPlaylistID } from '../../../redux/actions/playlistSongsByIdActions';

function VideoCard({
  player,
  currentSong,
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
    currentSong(
      playlistSongsById[player.currentActivePlaylistId][index]?.snippet
        .resourceId.videoId,
    );
  };
  const videoList = playlistSongsById[player.currentActivePlaylistId]?.map(
    (ele, i) => (
      <button
        type="button"
        className="mx-2 my-1 cursor-pointer w-[94%]  "
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
              ? ' bg-[#23036a]'
              : null
          }  overflow-hidden hover:bg-[#24036ae5] hover:text-[#fff] h-11 lg:h-14 rounded-sm`}
        >
          <div className="flex h-full hover:text-white">
            {/* <img
              loading="lazy"
              className="w-10  h-full object-cover rounded-l-sm "
              src={ele.snippet.thumbnails.default?.url}
              alt={`${ele.snippet.title}`}
              /> */}
            <div
            // className="cardText  flex flex-col items-baseline ml-1 truncate ">
              className={`${
                player.currentSong === ele.snippet.resourceId.videoId
                  ? ' text-[#ffff] '
                  : ''
              }  cardText  flex flex-col  hover:text-[#fff] items-baseline ml-1 truncate `}
            >
              <p className="tracking-wide truncate font-medium text-justify leading-5  w-[100%] xl:text-lg  ">
                {`${i + 1} - ${ele.snippet.title}`}
              </p>

              <p className="cardArtist font-light  truncate  w-[100%] text-justify xl:text-lg">
                {ele.snippet.videoOwnerChannelTitle}
              </p>
            </div>
          </div>
        </div>
      </button>
    ),
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
      <ul className="ulListCards mt-1 h-full md:mt-0  overflow-y-auto  ">
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
    currentSong: PropTypes.string.isRequired,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
    rememberLastVideo: PropTypes.bool.isRequired,
  }).isRequired,
  currentSong: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  addSongsByPlaylistID: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  lastPlayedPlaylistDetails: PropTypes.func.isRequired,
  playlistLength: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  currentSong,
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
