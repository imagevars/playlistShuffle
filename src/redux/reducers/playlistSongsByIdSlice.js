import { cloneDeep } from 'lodash';
import {
  PLAYLISTSONGS_ADDSONGSBYPLAYLISTID,
  PLAYLISTSONGS_REMOVEPLAYLISTSONGSBYID,
} from '../constants/playlistSongsByIdTypes';

const initialState = {};

export default function playlistSongsByIdReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYLISTSONGS_ADDSONGSBYPLAYLISTID: {
      const newState = { ...state, [action.payload.id]: action.payload.songs };
      return newState;
    }

    case PLAYLISTSONGS_REMOVEPLAYLISTSONGSBYID: {
      const updatedState = cloneDeep(state);
      delete updatedState[action.payload];
      return updatedState;
    }

    default:
      return state;
  }
}
