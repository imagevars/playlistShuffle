import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';

function AboutPage() {
  return (
    <div className="bg-bgWhite dark:bg-bgBlack h-screen min-h-screen">
      <Navbar />
      <div className="flex text-primaryColor dark:text-DarkPrimaryColor justify-center items-center bg-bgWhite dark:bg-bgBlack">
        <div className="text-bgBlack dark:text-bgWhite bg-bgWhite dark:bg-bgBlack  text-base w-4/4 md:w-3/5 text-justify">
          <p className="font-open mx-4 my-2 list-disc">
            If you like the page don&apos;t forget the give a star to this
            <a className="text-primaryColor dark:text-DarkPrimaryColor font-semibold font-open hover:scale-110" href="https://github.com/jooonathann/playlistShuffle" target="_blank" rel="noopener noreferrer" aria-label="github link"> repo</a>
            , its free (for now).
          </p>
          <p className="font-open mx-4 my-2">I made this because the shuffle algo of Youtube does not shuffle, and the other pages that I&apos;ve tried didn&apos;t had the things that I wanted.</p>
          <p className="font-open mx-4 my-2">This page uses localStorage of the browser as the database and according to me it can fit at least 20000 worth of videos in playlist on chrome desktop, if you have an error while loading a playlist you will have to deleted it and load it again.</p>
          <p className="font-open mx-4 my-2">The page may keep changing in the future, Jonathan.</p>
        </div>
      </div>
    </div>
  );
}

AboutPage.propTypes = {
  player: PropTypes.shape({
    darkMode: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(null, null)(AboutPage);
