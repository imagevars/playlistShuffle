import { cloneDeep } from 'lodash';
import {
  PLAYLIST_SONGS_ADD_SONGS_BY_PLAYLIST_ID,
  PLAYLIST_SONGS_REMOVE_PLAYLIST_SONGS_BY_ID,
} from '../constants/playlistSongsByIdTypes';

const initialState = {};

export default function playlistSongsByIdReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_SONGS_ADD_SONGS_BY_PLAYLIST_ID: {
      const newState = { ...state, [action.payload.id]: action.payload.songs };
      return newState;
    }

    case PLAYLIST_SONGS_REMOVE_PLAYLIST_SONGS_BY_ID: {
      const updatedState = cloneDeep(state);
      delete updatedState[action.payload];
      return updatedState;
    }

    default:
      return state;
  }
}
