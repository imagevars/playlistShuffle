import React from 'react';
import GitHubButton from 'react-github-btn';
import { useNavigate } from 'react-router-dom';
import { AiFillInfoCircle } from 'react-icons/ai';

function Footer() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/about');
  };

  return (
    <footer className="">
      <div className="flex justify-center">
        <AiFillInfoCircle
          onClick={handleClick}
          size={30}
          className="mx-3 my-1 cursor-pointer text-primary hover:text-secondary"
        />
      </div>
      <div className="flex items-center justify-center">
        <p className="my-1 text-center text-textColor font-open">
          Made with ♥ by Jonathan
        </p>
        <div className="items-center mx-2 mt-auto mb-0">
          <GitHubButton
            href="https://github.com/jooonathann/playlistShuffle"
            data-icon="octicon-star"
            data-show-count="true"
            aria-label="Star jooonathann/playlistShuffle on GitHub"
          >
            Star
          </GitHubButton>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
