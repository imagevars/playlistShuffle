import React from 'react'
import { connect } from 'react-redux'

const PlayingRightNow = ({player, songs}) => {
  const currIndex = songs.findIndex((ele) => {
    return ele.snippet?.resourceId.videoId === player.currentSong;
  });
  console.log('PLAYERRR', currIndex)
  return (
    <div className='songTitle'>{songs[currIndex].snippet.title}</div>
  )
}

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    player: state.player,
  };
};

export default connect(mapStateToProps, null)(PlayingRightNow)