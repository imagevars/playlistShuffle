import { combineReducers } from "redux";
import playerReducer from "./reducers/playerSlice";
import playlistDetailsReducer from "./reducers/playlistDetailsSlice";
import playlistSongsByIdReducer from "./reducers/playlistSongsByIdSlice";
import hasPlaylistLoadedReducer from "./reducers/playlistloadedSlice";
const rootReducer = combineReducers({
  playlistSongsById: playlistSongsByIdReducer,
  player: playerReducer,
  playlistDetails: playlistDetailsReducer,
  hasplaylistloaded: hasPlaylistLoadedReducer,
});

export default rootReducer;
