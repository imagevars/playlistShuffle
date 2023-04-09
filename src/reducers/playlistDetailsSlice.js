import {
  PLAYLISTDETAILS_ADDTOPLAYLISTDETAILS,
  PLAYLISTDETAILS_DELETEFROMPLAYLISTDETAILS,
  PLAYLISTDETAILS_ETAG,
} from "../constants/playlistDetailsTypes";

const initialState = [];

export default function playlistDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case "playlistDetails/add": {
      return action.payload;
    }
    case PLAYLISTDETAILS_ADDTOPLAYLISTDETAILS: {
      if (
        state.filter(
          (element) => element.playlistId === action.payload.playlistId
        ).length
      ) {
        return state;
      } else return [...state, action.payload];
    }
    case PLAYLISTDETAILS_DELETEFROMPLAYLISTDETAILS: {
      return state.filter((element) => element.playlistId !== action.payload);
    }
    case PLAYLISTDETAILS_ETAG: {
      return state.map((ele) => {
        if (ele.playlistId === action.payload.playlistId) {
          return {
            ...ele,
            playlistEtag: action.payload.etag,
          };
        } else {
          return ele;
        }
      });

      // return {...state, playlistEtag: action.payload}
    }
    default:
      return state;
  }
}
