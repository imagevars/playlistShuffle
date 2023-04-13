import {
  PLAYER_ISPLAYING,
  PLAYER_ISLOOPACTIVE,
  PLAYER_ISSHUFFLEACTIVE,
  PLAYER_PREVIOUSSONG,
  PLAYER_CURRENTSONG,
  PLAYER_NEXTSONG,
  PLAYER_SETCURRENTACTIVEPLAYLIST,
} from "../constants/playerTypes";

const initialState = {
  isPlaying: true,
  previousSong: "",
  currentSong: "",
  nextSong: "",
  isShuffleActive: false,
  isLoopActive: false,
  currentActivePlaylistId: "",
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

    default:
      return state;
  }
}
