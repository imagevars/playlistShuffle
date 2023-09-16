import React, { memo, useMemo } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function PlaylistInfo({ playlistDetails }) {
  const { id } = useParams();

  const info = useMemo(
    () => playlistDetails?.find((ele) => ele.playlistId === id),
    [playlistDetails, id],
  );

  return (
    <div className="flex my-1 justify-center md:justify-start">
      <p className="text-black dark:text-white ml-2 tracking-tight font-open font-semibold truncate">
        {' '}
        <a href={`https://www.youtube.com/playlist?list=${id}`} target="_blank" rel="noopener noreferrer">
          {' '}
          {info?.playlistName}
        </a>
      </p>
    </div>
  );
}

PlaylistInfo.propTypes = {
  playlistDetails: PropTypes.arrayOf(
    PropTypes.shape({
      playlistName: PropTypes.string.isRequired,
      playlistId: PropTypes.string.isRequired,
      playlistImage: PropTypes.string.isRequired,
      playlistEtag: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  playlistDetails: state.playlistDetails,
});

export default connect(mapStateToProps, null)(memo(PlaylistInfo));
