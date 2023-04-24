import HAS_PLAYLIST_LOADED from '../constants/hasPlaylistLoadedTypes';

const initialState = {
  HAS_PLAYLIST_LOADED: false,
};

export default function hasPlaylistLoadedReducer(action, state = initialState) {
  switch (action.type) {
    case HAS_PLAYLIST_LOADED:
      return action.payload;
    default:
      return state;
  }
}
