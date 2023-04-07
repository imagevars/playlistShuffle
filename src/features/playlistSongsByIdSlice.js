import { cloneDeep } from "lodash";

const initialState = {};

export default function playlistSongsByIdReducer(state = initialState, action) {
  switch (action.type) {
    case "songs/addSongsByPlaylistID": {
      try {
        const newState = { ...state, [action.payload.id]: action.payload.songs };
        return newState

      } catch (err) {
      console.error(err)  
      return state
      }
    }
    

    case "playlistSongs/removePlaylistSongsById": {
      const updatedState = cloneDeep(state);
      delete updatedState[action.payload];
      return updatedState;
    }

    default:
      return state;
  }
}
