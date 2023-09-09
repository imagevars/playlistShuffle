import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiErrorCircle } from 'react-icons/bi';
import Navbar from '../Navbar/Navbar';

function ErrorPage() {
  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate('/');
  };

  const handleClickAbout = () => {
    navigate('/about');
  };
  return (
    <div className="bg-bgWhite dark:bg-bgBlack h-screen min-h-screen">
      <Navbar />
      <div className="flex flex-col text-primaryColor dark:text-DarkPrimaryColor justify-center items-center bg-bgWhite dark:bg-bgBlack w-4/4 md:w-3/5 mt-12">
        <BiErrorCircle fill="red" size={75} />
        <h1 className="text-bgBlack text-center text-3xl font-semibold font-open dark:text-bgWhite ">An error has occurred</h1>
        <div>
          <p className="text-bgBlack dark:text-bgWhite my-1 font-open text-center">
            To report the problem on github&nbsp;
            <a className="text-primaryColor dark:text-DarkPrimaryColor font-semibold font-open hover:scale-110" href="https://github.com/jooonathann/playlistShuffle/issues" target="_blank" rel="noopener noreferrer" aria-label="github link">here</a>
          </p>
          <p className="text-bgBlack dark:text-bgWhite font-open text-center">
            More info about the page&nbsp;
            <button
              onClick={handleClickAbout}
              className="text-primaryColor dark:text-DarkPrimaryColor my-1 font-semibold font-open"
              type="button"
            >
              here
            </button>
          </p>
          <p className="text-bgBlack dark:text-bgWhite my-1 font-open text-center">
            To go back home&nbsp;
            <button
              onClick={handleClickHome}
              className="text-primaryColor dark:text-DarkPrimaryColor font-semibold font-open"
              type="button"
            >
              here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
