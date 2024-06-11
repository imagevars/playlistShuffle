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
          <p className="font-open mx-4 my-2">
            To clean the localStorage data click&nbsp;
            <button
              type="button"
              className="text-primary"
              onClick={deleteLocalStorage}
            >
              here
            </button>
          </p>
          <p className="font-open mx-4 my-2 list-disc">
            If you are enjoying the site, you can support it by buying me
            a&nbsp;
            <a
              aria-label="buy me a coffee link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
              href="https://buymeacoffee.com/playlistshuffle"
            >
              coffee
            </a>
            . Thank you!
          </p>
          <p className="font-open mx-4 my-2">
            I created this because the shuffle algorithm on YouTube doesn&apos;t
            effectively shuffle, and the other pages I tried didn&apos;t have
            the features I was looking for.
          </p>
          <p className="font-open mx-4 my-2">
            This page utilizes the browser&apos;s localStorage as the database.
            In my experience, it can fit at least 20000 worth of videos in
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
