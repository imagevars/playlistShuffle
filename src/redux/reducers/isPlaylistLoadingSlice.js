import IS_PLAYLIST_LOADING from '../constants/isPlaylistLoadingTypes';

const initialState = {
  isPlaylistLoading: false,
};

export default function isPlaylistLoadingReducer(state = initialState, action) {
  switch (action.type) {
    case IS_PLAYLIST_LOADING:
      return action.payload;
    default:
      return state;
  }
}
