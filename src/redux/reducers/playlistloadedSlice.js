import HASPLAYLISTLOADED from '../constants/hasPlaylistLoadedTypes';

const initialState = {
  hasPlaylistLoaded: false,
};

export default function hasPlaylistLoadedReducer(state = initialState, action) {
  switch (action.type) {
    case HASPLAYLISTLOADED:
      return action.payload;
    default:
      return state;
  }
}
