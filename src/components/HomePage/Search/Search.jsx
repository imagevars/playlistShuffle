import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import fetchPlaylistVideos from "../../../utils/fetchPlaylistVideos";
import fetchPlaylistData from "../../../utils/fetchPlaylistData";
import validateId from "../../../utils/validateId";
import {
  currentSong,
  setCurrentActivePlaylistId,
  isShuffleActive,
  setIsPlLoading,
} from "../../../redux/actions/playerActions";
import {
  addToPlaylistDetails,
  modifyEtagInPlaylistDetailsById,
  lastPlayedIndexPlaylistDetails,
} from "../../../redux/actions/playlistDetailsActions";
import { addSongsByPlaylistID } from "../../../redux/actions/playlistSongsByIdActions";

function Search({
  playlistDetails,
  currentSong,
  addToPlaylistDetails,
  addSongsByPlaylistID,
  playlistSongsById,
  setCurrentActivePlaylistId,
  modifyEtagInPlaylistDetailsById,
  isShuffleActive,
  player,
  setIsPlLoading,
}) {
  const [playlistId, setPlaylistId] = useState("");
  const [isIdInvalid, setIsIdInvalid] = useState(false);
  const [errorReason, setErrorReason] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const PLinput = await validateId(playlistId);
    if (typeof PLinput === "string") {
      const currentPlaylistInfo = playlistDetails.filter(
        (element) => element.playlistId === PLinput,
      );
      if (currentPlaylistInfo.length === 1) {
        const findPLIndex = playlistDetails.findIndex(
          (element) => element.playlistId === PLinput,
        );
        setCurrentActivePlaylistId(PLinput);
        currentSong(
          playlistSongsById[PLinput][playlistDetails[findPLIndex].currentIndex]
            .snippet.resourceId.videoId,
        );
        navigate(`/${PLinput}`);
      }
      if (currentPlaylistInfo.length === 0) {
        try {
          setIsPlLoading(true);
          const currEtag = "";
          const data = await fetchPlaylistVideos(PLinput, currEtag);
          if (data === 404) {
            setIsPlLoading(false);
            setErrorReason("Playlist doesn't seems valid");
            setIsIdInvalid(true);
            return null;
          }
          if (data === 403) {
            setIsPlLoading(false);
            setErrorReason("You're out of luck, try in a few hours");
            setIsIdInvalid(true);
            return null;
          }
          const playlistDataInfo = await fetchPlaylistData(
            PLinput,
            data.playlistEtag,
          );
          setErrorReason("");
          const playlistEtagAndId = {
            playlistId: PLinput,
            etag: data.playlistEtag,
          };
          await addToPlaylistDetails(playlistDataInfo);
          const playlistObject = {
            id: PLinput,
            songs: data.responseArrToAdd,
          };
          await addSongsByPlaylistID(playlistObject);
          setIsPlLoading(false);
          setCurrentActivePlaylistId(PLinput);
          await modifyEtagInPlaylistDetailsById(playlistEtagAndId);
          await currentSong(data.currentSong);
          isShuffleActive(false);
          navigate(`/${PLinput}`);
        } catch (error) {
          setIsPlLoading(false);
          return null;
        }
      }
      setIsPlLoading(false);
      return null;
    }
    if (typeof PLinput === "object") {
      if (PLinput === null) {
        setIsIdInvalid(true);
        setIsPlLoading(false);
        return null;
      }
      if (typeof PLinput === "object") {
        const mixArr = [];
        setIsPlLoading(true);
        for (let i = 0; i < PLinput.playlists.length; i += 1) {
          const currEtag = "";
          /* eslint-disable no-await-in-loop */
          const data = await fetchPlaylistVideos(
            PLinput.playlists[i],
            currEtag,
          );
          if (data === 404) {
            // if there's an error on a playlist of the mix,
            // that playlist will not be included on the mix
            // eslint-disable-next-line
            console.log(`Error on playlist ${PLinput.playlists[i].name}`);
          }
          if (data === 403) {
            setIsPlLoading(false);
            setErrorReason("You're out of luck, try in a few hours");
            setIsIdInvalid(true);
            return null;
          }
          // Basic, I know
          if (mixArr.length > 15000) {
            break;
          } else {
            mixArr.push(...data.responseArrToAdd);
          }
        }
        if (mixArr.length === 0) return null;

        const mixPlId = `MIXpl${Math.random().toString().slice(2, 20)}`;
        const playlistDetailsObject = {
          playlistName: PLinput.name,
          playlistId: mixPlId,
          playlistImage: `https://i.ytimg.com/vi/${mixArr[0].snippet.resourceId.videoId}/mqdefault.jpg`,
          playlistEtag: "",
          currentIndex: 0,
        };

        await addToPlaylistDetails(playlistDetailsObject);
        const playlistObject = {
          id: mixPlId,
          songs: mixArr,
        };
        await addSongsByPlaylistID(playlistObject);
        setIsPlLoading(false);
        setCurrentActivePlaylistId(mixPlId);
        await currentSong(mixArr[0].snippet.resourceId.videoId);
        isShuffleActive(false);
        navigate(`/${mixPlId}`);
      } else return null;
    }
    setIsPlLoading(false);
    return null;
  };

  const handleChange = (e) => {
    e.preventDefault();
    setPlaylistId(e.target.value);
  };
  return (
    <div className="searchContainer w-full my-4 mx-auto ">
      <form className="" onSubmit={(e) => handleSubmit(e)}>
        {isIdInvalid ? (
          <p className="text-textColor font-open">{errorReason}</p>
        ) : (
          <p className="text-textColor font-open">
            To add multiple playlist read&nbsp;
            <a
              className="text-secondary font-semibold font-open hover:scale-110 underline"
              href="https://github.com/jooonathann/playlistShuffle#How-to-combine-multiple-playlist"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="github link"
            >
              here
            </a>
            &nbsp;or Enter a playlist URL or ID:
          </p>
        )}

        <div className="w-full flex my-2 justify-between">
          <input
            className={`inputSearch w-5/6 md:w-11/12 mr-2 py-2 px-2 rounded-md font-open shadow-lg focus:outline-none focus:shadow-outline  ${
              isIdInvalid ? "border border-red" : ""
            }`}
            placeholder="example of a PL ID: PLi9drqWffJ9FWBo7ZVOiaVy0UQQEm4IbP"
            type="text"
            required
            onChange={(e) => handleChange(e)}
            value={playlistId}
          />
          <button
            className=" rounded-md px-4 w-2/12 md:w-1/12 font-open shadow-shadowBox active:shadow-none dark:shadow-shadowBoxDarkMode dark:active:shadow-none flex items-center justify-center text-textColorInside hover:bg-secondary bg-primary  active:scale-105 "
            type="submit"
          >
            {player.isPlLoading === true ? (
              <svg
                className="animate-spin mx-auto h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              "Play"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

Search.propTypes = {
  player: PropTypes.shape({
    isPlLoading: PropTypes.bool.isRequired,
  }).isRequired,
  playlistDetails: PropTypes.arrayOf(
    PropTypes.shape({
      playlistName: PropTypes.string.isRequired,
      playlistId: PropTypes.string.isRequired,
      playlistImage: PropTypes.string.isRequired,
      playlistEtag: PropTypes.string.isRequired,
      currentIndex: PropTypes.number.isRequired,
    }),
  ).isRequired,
  currentSong: PropTypes.func.isRequired,
  addToPlaylistDetails: PropTypes.func.isRequired,
  addSongsByPlaylistID: PropTypes.func.isRequired,
  playlistSongsById: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  setCurrentActivePlaylistId: PropTypes.func.isRequired,
  modifyEtagInPlaylistDetailsById: PropTypes.func.isRequired,
  isShuffleActive: PropTypes.func.isRequired,
  setIsPlLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playlistSongsById: state.playlistSongsById,
  playlistDetails: state.playlistDetails,
  player: state.player,
});

const mapDispatchToProps = {
  currentSong,
  addToPlaylistDetails,
  addSongsByPlaylistID,
  setCurrentActivePlaylistId,
  modifyEtagInPlaylistDetailsById,
  isShuffleActive,
  lastPlayedIndexPlaylistDetails,
  setIsPlLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
