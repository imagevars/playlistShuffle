const initialState = [];

export default function playlistDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case "playlistDetails/add": {
      return action.payload;
    }
    case "playlistDetails/addToPlaylistDetails": {
      if (
        state.filter(
          (element) => element.playlistId === action.payload.playlistId
        ).length
      ) {
        return state;
      } else return [...state, action.payload];
    }
    case "playlistDetails/deleteFromPlaylistDetails": {
      return state.filter((element) => element.playlistId !== action.payload);
    }
    case "playlistDetails/Etag": {
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
