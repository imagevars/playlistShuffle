import {
  PLAYLIST_DETAILS_ADD_TO_PLAYLIST_DETAILS,
  PLAYLIST_DETAILS_DELETE_FROM_PLAYLIST_DETAILS,
  PLAYLIST_DETAILS_ETAG,
  PLAYLIST_DETAILS_LAST_PLAYED_INDEX,
  PLAYLIST_DETAILS_LENGTH,
  PLAYLIST_DETAILS_IMAGE,
} from "../constants/playlistDetailsTypes";

const initialState = [];

export default function playlistDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case "playlistDetails/add": {
      return action.payload;
    }
    case PLAYLIST_DETAILS_ADD_TO_PLAYLIST_DETAILS: {
      if (
        state.filter(
          (element) => element.playlistId === action.payload.playlistId,
        ).length
      ) {
        return state;
      }
      return [...state, action.payload];
    }
    case PLAYLIST_DETAILS_DELETE_FROM_PLAYLIST_DETAILS: {
      return state.filter((element) => element.playlistId !== action.payload);
    }
    case PLAYLIST_DETAILS_ETAG: {
      return state.map((ele) => {
        if (ele.playlistId === action.payload.playlistId) {
          return {
            ...ele,
            playlistEtag: action.payload.etag,
          };
        }
        return ele;
      });
    }
    case PLAYLIST_DETAILS_LAST_PLAYED_INDEX: {
      return state.map((ele) => {
        if (ele.playlistId === action.payload.playlistId) {
          return {
            ...ele,
            currentIndex: action.payload.currentIndex,
          };
        }
        return ele;
      });
    }
    case PLAYLIST_DETAILS_LENGTH: {
      return state.map((ele) => {
        if (ele.playlistId === action.payload.playlistId) {
          return {
            ...ele,
            playlistLength: action.payload.playlistLength,
          };
        }
        return ele;
      });
    }
    case PLAYLIST_DETAILS_IMAGE: {
      return state.map((ele) => {
        if (ele.playlistId === action.payload.playlistId) {
          return {
            ...ele,
            playlistImage: action.payload.playlistImage,
          };
        }
        return ele;
      });
    }
    default:
      return state;
  }
}
