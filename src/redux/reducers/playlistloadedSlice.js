import { HASPLAYLISTLOADED } from "../constants/hasplaylistLoaded";

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
