import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MersenneTwister from 'mersenne-twister';
import {
  currentSong,
  isShuffleActive,
  setVideoDuration,
} from '../../../redux/actions/playerActions';
import { lastPlayedIndexPlaylistDetails, playlistLength } from '../../../redux/actions/playlistDetailsActions';
import { addSongsByPlaylistID } from '../../../redux/actions/playlistSongsByIdActions';

function VideoCard({
  player,
  currentSong,
  playlistSongsById,
  addSongsByPlaylistID,
  isShuffleActive,
  lastPlayedIndexPlaylistDetails,
  playlistLength,
  setVideoDuration,
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
  };

  const videoList = playlistSongsById[player.currentActivePlaylistId]?.map(
    (ele, i) => (
      <button
        type="button"
        className="w-full my-1 "
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
              ? 'border-b-primaryColor '
              : null
          }  text-center `}
        >
          <div className=" flex justify-between hover:text-primaryColor ">

            <div
              className={`${
                player.currentSong === ele.snippet.resourceId.videoId
                  ? ' text-primaryColor  dark:text-primaryColorDarkMode font-semibold  dark:font-semibold '
                  : ' dark:text-bgWhite '
              } font-normal w-full text-center md:text-left md:mx-4 md:truncate font-open hover:text-primaryColor  dark:hover:text-primaryColorDarkMode`}
            >
              <p className="truncate ">
                {`${i + 1} - ${ele.snippet.title}`}
              </p>

              <p className={`${player.currentSong === ele.snippet.resourceId.videoId ? ' text-primaryColor dark:text-primaryColorDarkMode  ' : 'text-gray dark:text-clearGray '}text-sm font-open `}>
                {ele.snippet.videoOwnerChannelTitle}
              </p>
            </div>
          </div>
          <div className={`${player.currentSong === ele.snippet.resourceId.videoId ? (' bg-primaryColor shadow-none dark:bg-primaryColorDarkMode ') : ('bg-clearGray shadow-shadowLine dark:shadow-shadowLineDarkMode  ')}w-[88%] h-0.5 mx-auto rounded-full `} />
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
      className="cardContainer "
    >
      <ul className="ulListCards ">
        {videoList}
      </ul>
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
  currentSong: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  addSongsByPlaylistID: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  lastPlayedIndexPlaylistDetails: PropTypes.func.isRequired,
  playlistLength: PropTypes.func.isRequired,
  setVideoDuration: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  currentSong,
  addSongsByPlaylistID,
  isShuffleActive,
  lastPlayedIndexPlaylistDetails,
  playlistLength,
  setVideoDuration,
};

const mapStateToProps = (state) => ({
  playlistSongsById: state.playlistSongsById,
  player: state.player,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
