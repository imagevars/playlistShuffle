import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function AboutPage() {
  const deleteLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="transition-colors bg-backColor image:bg-[unset] flex flex-col justify-between h-[100vh]">
      <Navbar />
      <div className="flex justify-center items-center overflow-y-auto">
        <div className="text-textColor text-base w-4/4 md:w-3/5 text-justify">
          <p className="text-textColor text-center my-1 font-open font-medium">
            To clean the localStorage data click&nbsp;
            <button
              type="button"
              className="text-[blue]"
              onClick={deleteLocalStorage}
            >
              here
            </button>
          </p>
          <p className="font-open mx-4 my-2 list-disc">
            If you like the page don&apos;t forget the give a star ★ to the
            github
            <a
              className="text-primary  font-semibold font-open hover:scale-110"
              href="https://github.com/jooonathann/playlistShuffle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="github link"
            >
              {' '}
              repo
            </a>
            , its free (for now).
          </p>
          <p className="font-open mx-4 my-2">
            I made this because the shuffle algo of Youtube does not shuffle,
            and the other pages that I&apos;ve tried didn&apos;t had the things
            that I wanted.
          </p>
          <p className="font-open mx-4 my-2">
            This page uses localStorage of the browser as the database and
            according to me it can fit at least 20000 worth of videos in
            playlist on chrome desktop, if you have an error while loading a
            playlist you will have to deleted it and load it again.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default connect(null, null)(AboutPage);
