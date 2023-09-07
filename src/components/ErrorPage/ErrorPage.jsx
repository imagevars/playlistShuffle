import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function ErrorPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className="min-h-screen bg-bgWhite  w-full  dark:bg-bgBlack ">
      <div className="w-[95%] md:max-w-[2200px] mx-auto my-0">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-96 ">
          <h1 className="text-bgBlack text-3xl dark:text-bgWhite ">An error has occurred</h1>
          <p className="text-bgBlack text-xl dark:text-bgWhite ">Go back home </p>
          <button
            type="button"
            onClick={handleClick}
            className="text-bgBlack text-4xl dark:text-white  hover:text-violet-200 underline"
          >
            click here
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
