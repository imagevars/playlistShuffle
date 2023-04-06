import { combineReducers } from "redux";
import playerRedicer  from "./features/playerSlice";
// import songsReducer from "./features/songsSlice";
import playlistDetailsReducer from "./features/playlistDetailsSlice";
import playlistSongsByIdReducer from "./features/playlistSongsByIdSlice";
const rootReducer = combineReducers({
  playlistSongsById: playlistSongsByIdReducer,
  // songs: songsReducer,
  player: playerRedicer,
  playlistDetails: playlistDetailsReducer,
});

export default rootReducer;
