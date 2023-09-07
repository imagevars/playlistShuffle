import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Footer({ player }) {
  const style = { color: 'bgBlack' };
  return (
    <div className="flex justify-center">
      <footer className="flex justify-center items-center">
        <a href="https://github.com/jooonathann/playlistShuffle" target="_blank" rel="noopener noreferrer" aria-label="github link">
          {player.darkMode === true
            ? <AiFillGithub fill="white" size={30} />
            : <AiFillGithub style={style} size={30} />}

        </a>
        {/* <p className="text-center text-lg
        dark:text-bgWhite"><a className="hover:text-[#607db7] hover:underline"
        href="mailto:playlistShuffle@protonmail.com ">Suggestions?</a></p> */}
        <p className="text-bgBlack text-center mx-2 font-open dark:text-bgWhite">about</p>
      </footer>
    </div>
  );
}

Footer.propTypes = {
  player: PropTypes.shape({
    darkMode: PropTypes.bool.isRequired,
  }).isRequired,

};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps, null)(Footer);
