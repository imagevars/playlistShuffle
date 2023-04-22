import { combineReducers } from "redux";
import playerReducer from "./redux/reducers/playerSlice";
import playlistDetailsReducer from "./redux/reducers/playlistDetailsSlice";
import playlistSongsByIdReducer from "./redux/reducers/playlistSongsByIdSlice";
import hasPlaylistLoadedReducer from "./redux/reducers/playlistloadedSlice";
const rootReducer = combineReducers({
  playlistSongsById: playlistSongsByIdReducer,
  player: playerReducer,
  playlistDetails: playlistDetailsReducer,
  hasplaylistloaded: hasPlaylistLoadedReducer,
});

export default rootReducer;
