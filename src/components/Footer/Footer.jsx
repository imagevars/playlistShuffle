import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInfoCircle,
} from 'react-icons/ai';

function Footer() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/about');
  };

  return (
    <footer className="">
      <div className="flex justify-center">
        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="github link"
          href="https://github.com/jooonathann/playlistShuffle"
        >
          <AiFillGithub
            size={30}
            className="mx-3 my-1 text-primary light:hover:text-[#333333] hover:text-textColorInside"
          />
        </a>
        <AiFillInfoCircle
          onClick={handleClick}
          size={30}
          className="mx-3 my-1 text-primary cursor-pointer hover:text-secondary"
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="twitter link"
          href="https://twitter.com/Jonathhn1"
        >
          <AiOutlineTwitter
            size={30}
            className="mx-3 my-1 text-primary hover:text-[#1da1f2] dark:hover:text-[#1da1f2]"
          />
        </a>
      </div>
      <p className="text-textColor text-center my-1 font-open">
        Made with ♥ by Jonathan
      </p>
    </footer>
  );
}

export default Footer;
