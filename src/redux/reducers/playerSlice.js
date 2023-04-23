import {
  PLAYER_ISPLAYING,
  PLAYER_ISLOOPACTIVE,
  PLAYER_ISSHUFFLEACTIVE,
  PLAYER_PREVIOUSSONG,
  PLAYER_CURRENTSONG,
  PLAYER_NEXTSONG,
  PLAYER_SETCURRENTACTIVEPLAYLIST,
  PLAYER_ISMUTEDACTIVE,
  PLAYER_SETPROGRESS,
  PLAYER_VIDEODURATION,
  PLAYER_SETPERCENTAGE,
  PLAYER_ISFULLSCREENACTIVE,
  PLAYER_REMEMBERLASTVIDEO
} from "../constants/playerTypes";

const initialState = {
  isPlaying: true,
  previousSong: "",
  currentSong: "",
  nextSong: "",
  isShuffleActive: false,
  isLoopActive: false,
  currentActivePlaylistId: "",
  isMutedActive: false,
  progress: "0",
  videoDuration: "0",
  videoPercentage: "0",
  isFullScreenActive: false,
  rememberLastVideo: false
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_ISPLAYING:
      return { ...state, isPlaying: action.payload };
    case PLAYER_ISLOOPACTIVE:
      return { ...state, isLoopActive: action.payload };

    case PLAYER_ISSHUFFLEACTIVE: {
      return { ...state, isShuffleActive: action.payload };
    }

    case PLAYER_PREVIOUSSONG: {
      return { ...state, previousSong: action.payload };
    }
    case PLAYER_CURRENTSONG: {
      return { ...state, currentSong: action.payload };
    }
    case PLAYER_NEXTSONG: {
      return { ...state, nextSong: action.payload };
    }
    case PLAYER_SETCURRENTACTIVEPLAYLIST: {
      return { ...state, currentActivePlaylistId: action.payload };
    }
    case PLAYER_ISMUTEDACTIVE: {
      return { ...state, isMutedActive: action.payload };
    }
    case PLAYER_SETPROGRESS: {
      return { ...state, progress: action.payload };
    }
    case PLAYER_VIDEODURATION: {
      return { ...state, videoDuration: action.payload };
    }
    case PLAYER_SETPERCENTAGE: {
      return { ...state, videoPercentage: action.payload };
    }
    case PLAYER_ISFULLSCREENACTIVE: {
      return { ...state, isFullScreenActive: action.payload };
    }
    case PLAYER_REMEMBERLASTVIDEO: {
      return { ...state, rememberLastVideo: action.payload };
    }
    default:
      return state;
  }
}
