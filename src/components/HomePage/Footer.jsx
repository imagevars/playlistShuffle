import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillGithub, AiOutlineTwitter, AiFillInfoCircle } from 'react-icons/ai';

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
            className="mx-3 my-1 text-primaryColor dark:text-DarkPrimaryColor hover:text-[#333333] dark:hover:text-bgWhite"
          />
        </a>
        <AiFillInfoCircle
          onClick={handleClick}
          size={30}
          className="mx-3 my-1 text-primaryColor dark:text-DarkPrimaryColor cursor-pointer hover:text-DarkPrimaryColor dark:hover:text-bgWhite"
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="twitter link"
          href="https://twitter.com/Jonathhn1"
        >
          <AiOutlineTwitter size={30} className="mx-3 my-1 text-primaryColor dark:text-DarkPrimaryColor hover:text-[#1da1f2] dark:hover:text-[#1da1f2]" />
        </a>
      </div>
    </footer>

  );
}

export default Footer;
