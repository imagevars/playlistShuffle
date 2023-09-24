import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillGithub, AiOutlineTwitter, AiFillInfoCircle } from 'react-icons/ai';

function Footer() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/about');
  };
  const deleteLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
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
          className="mx-3 my-1 text-primary cursor-pointer hover:text-DarkPrimaryColor dark:hover:text-bgWhite"
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="twitter link"
          href="https://twitter.com/Jonathhn1"
        >
          <AiOutlineTwitter size={30} className="mx-3 my-1 text-primary hover:text-[#1da1f2] dark:hover:text-[#1da1f2]" />
        </a>
      </div>
      {/* <p className="text-textColor text-center my-1 font-open">Made with ♥ by Jonathan</p> */}
      <p className="text-textColor text-center my-1 font-open font-medium">
        Had to break the old theme system to make a new one.
        &nbsp;Save your playlist ID&apos;s and click&nbsp;
        <button type="button" className="text-[blue]" onClick={deleteLocalStorage}>
          here
        </button>
        &nbsp;to fix the theme
      </p>
      <p className="text-textColor text-center my-1 font-open text-xs">The message will be here for a week</p>
    </footer>

  );
}

export default Footer;
