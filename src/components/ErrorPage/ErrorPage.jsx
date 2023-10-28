import React from "react";
import { useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function ErrorPage() {
  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/");
  };

  const handleClickAbout = () => {
    navigate("/about");
  };
  return (
    <div className="transition-colors bg-backColor image:bg-[unset] flex flex-col justify-between h-[100vh]">
      <Navbar />
      <div className="flex flex-col items-center md:w-3/5  mx-auto">
        <BiErrorCircle fill="red" size={75} />
        <h2 className="text-textColor text-center text-3xl font-semibold font-open  ">
          An error has occurred
        </h2>
        <div>
          <p className="text-textColor my-1 font-open text-center">
            To report the problem on github&nbsp;
            <a
              className="text-primary font-semibold font-open"
              href="https://github.com/jooonathann/playlistShuffle/issues"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="github link"
            >
              here
            </a>
          </p>
          <p className="text-textColor font-open text-center">
            More info about the page&nbsp;
            <button
              onClick={handleClickAbout}
              className="text-primary font-semibold font-open"
              type="button"
            >
              here
            </button>
          </p>
          <p className="text-textColor my-1 font-open text-center">
            To go back home&nbsp;
            <button
              onClick={handleClickHome}
              className="text-primary font-semibold font-open"
              type="button"
            >
              here
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ErrorPage;
