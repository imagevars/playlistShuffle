import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function PlayingRightNow({ player, playlistSongsById, playlistDetails }) {
  const findPlaylistIndex = playlistDetails.findIndex((element) => element.playlistId
  === player.currentActivePlaylistId);

  const getTitleAndArtist = (title, ownerTitle) => {
    try {
      const joinedTitleAndOwnerTitle = [title, ownerTitle];
      // console.log('join ', joinedTitleAndOwnerTitle);
      if (title === 'Private video') {
        return title;
      }
      if (joinedTitleAndOwnerTitle[0].includes('-')) {
        const regex = /^(.*?)-(.*)$/;
        const match = joinedTitleAndOwnerTitle[0].match(regex);

        const [, artist, title] = match;

        return [title, artist];
      }
      if (joinedTitleAndOwnerTitle[0].includes('//')) {
        const regex = /^(.*?)\s\/\/\s(.*)$/;
        const match = joinedTitleAndOwnerTitle[0].match(regex);

        const [, artist, title] = match;

        return [title, artist];
      }
      if (joinedTitleAndOwnerTitle[1].includes(' - Topic')) {
        const regex = /^(.*?)\s-\sTopic$/;
        const match = joinedTitleAndOwnerTitle[1].match(regex);
        const artist = match[1];
        return [title, artist];
      }
      return [title, ownerTitle];
    } catch (error) {
      return title;
    }
  };

  const [title, artist] = getTitleAndArtist(
    playlistSongsById[player.currentActivePlaylistId][
      playlistDetails[findPlaylistIndex].currentIndex
    ].snippet.title,
    playlistSongsById[player.currentActivePlaylistId][
      playlistDetails[findPlaylistIndex].currentIndex
    ].snippet.videoOwnerChannelTitle,
  );

  return (
    <div className="md:flex md:self-center">

      <div className="md:text-clip md:w-full">
        <p className="songTitle text-[#ffff]  font-semibold text-center md:text-left  lg:text-md truncate tracking-wide  mx-auto w-[95%]">
          {playlistDetails[findPlaylistIndex].currentIndex + 1}
          {' '}
          -
          {' '}
          {title}
        </p>
        <p className="songTitle text-[#ffff]  font-normal tracking-wide text-center md:text-left  lg:text-md truncate    mx-auto w-[95%]">
          {
          artist
            ? (
              <a href={`https://www.youtube.com/results?search_query=${artist}`} target="_blank" rel="noopener noreferrer">
                {artist}
              </a>
            ) : (''
            )
          }
        </p>

      </div>
    </div>
  );
}

PlayingRightNow.propTypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    previousSong: PropTypes.string,
    currentSong: PropTypes.string.isRequired,
    nextSong: PropTypes.string,
    isShuffleActive: PropTypes.bool.isRequired,
    isLoopActive: PropTypes.bool.isRequired,
    currentActivePlaylistId: PropTypes.string.isRequired,
    isMutedActive: PropTypes.bool.isRequired,
  }).isRequired,
  playlistDetails: PropTypes.arrayOf(PropTypes.shape({
    playlistName: PropTypes.string.isRequired,
    playlistId: PropTypes.string.isRequired,
    playlistImage: PropTypes.string.isRequired,
    playlistEtag: PropTypes.string.isRequired,
    currentIndex: PropTypes.number.isRequired,

  })).isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
};
const mapStateToProps = (state) => ({
  playlistSongsById: state.playlistSongsById,
  player: state.player,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, null)(memo(PlayingRightNow));
