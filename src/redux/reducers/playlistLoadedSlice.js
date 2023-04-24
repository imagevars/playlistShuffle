import HAS_PLAYLIST_LOADED from '../constants/hasPlaylistLoaded';

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
