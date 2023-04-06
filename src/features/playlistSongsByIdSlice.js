import { cloneDeep } from "lodash";

const initialState = {};

export default function playlistSongsByIdReducer(state = initialState, action) {
  switch (action.type) {
    case "songs/addSongsByPlaylistID": {
      return { ...state, [action.payload.id]: action.payload.songs };
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
