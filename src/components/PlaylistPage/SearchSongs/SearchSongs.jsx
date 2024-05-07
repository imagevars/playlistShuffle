import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';
import { setWordsToSearch } from '../../../redux/actions/playerActions';

function SearchSongs({ setWordsToSearch, player }) {
  const setWords = (e) => {
    if (typeof e !== 'string') return;
    setWordsToSearch(e.toLowerCase());
  };

  const handleDeleteText = () => {
    setWordsToSearch('');
  };

  return (
    <div className="w-full  flex justify-center">
      <input
        onChange={(e) => setWords(e.target.value)}
        value={player.searchWords}
        type="text"
        placeholder="Search"
        className="inputSearch w-full md:w-[90%]  py-2 mx-auto px-2 bg-backColor image:bg-[unset] text-textColor text-center md:text-left rounded-md font-open focus:outline-double focus:outline-secondary pr-10 md:mr-0.5 md:mx-4 text-base pl-10 md:pl-2"
      />
      {player.searchWords.length ? (
        <button
          type="button"
          aria-label="delete text"
          onClick={handleDeleteText}
          className="my-auto text-gray  mx-1 -ml-9 w-[8%] md:w-[12%] cursor-pointer"
        >
          <IoMdClose size={25} />
        </button>
      ) : (
        <button
          type="button"
          aria-label="delete text"
          onClick={handleDeleteText}
          className="my-auto text-gray  mx-1 -ml-9 w-[8%] md:w-[12%] cursor-pointer invisible"
        >
          <IoMdClose size={25} />
        </button>
      )}
    </div>
  );
}
SearchSongs.propTypes = {
  player: PropTypes.shape({
    searchWords: PropTypes.string.isRequired,
  }).isRequired,
  setWordsToSearch: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  setWordsToSearch,
};
const mapStateToProps = (state) => ({
  player: state.player,
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchSongs);
