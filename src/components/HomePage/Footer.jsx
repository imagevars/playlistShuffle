import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/about');
  };
  return (
    <div className="flex justify-center">
      <footer className="flex justify-center items-center">
        <button type="button" onClick={handleClick} className="text-bgBlack text-center mx-2 font-open dark:text-bgWhite text-lg">About</button>
      </footer>
    </div>
  );
}

Footer.propTypes = {
  player: PropTypes.shape({
    darkMode: PropTypes.bool.isRequired,
  }).isRequired,

};

export default connect(null, null)(Footer);
