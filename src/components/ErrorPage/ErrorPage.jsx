import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function ErrorPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className="min-h-screen bg-[#ffff] w-full">
      <div className="w-[95%] md:max-w-[2200px] mx-auto my-0">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-96 ">
          <h1 className="text-black text-3xl ">An error has occurred</h1>
          <p className="text-black text-xl">Go back home </p>
          <button
            type="button"
            onClick={handleClick}
            className="text-black text-4xl hover:text-violet-200 underline"
          >
            click here
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
