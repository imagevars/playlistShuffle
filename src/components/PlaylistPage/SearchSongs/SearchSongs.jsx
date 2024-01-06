import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setWordsToSearch } from '../../../redux/actions/playerActions';

function SearchSongs({ setWordsToSearch }) {
  const setWords = (e) => {
    if (typeof e !== 'string') return;
    setWordsToSearch(e.toLowerCase());
  };

  return (
    <div className="w-full flex ">
      <input
        onChange={(e) => setWords(e.target.value)}
        type="text"
        placeholder="Search"
        className="inputSearch w-full md:w-[90%]  py-2 mx-auto px-2 bg-backColor image:bg-[unset] text-center text-textColor  rounded-md font-open    focus:outline-double focus:outline-secondary"
      />
    </div>
  );
}
SearchSongs.propTypes = {
  setWordsToSearch: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  setWordsToSearch,
};

export default connect(null, mapDispatchToProps)(SearchSongs);
