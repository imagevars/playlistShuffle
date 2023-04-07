import { combineReducers } from "redux";
import playerRedicer  from "./features/playerSlice";
import playlistDetailsReducer from "./features/playlistDetailsSlice";
import playlistSongsByIdReducer from "./features/playlistSongsByIdSlice";
const rootReducer = combineReducers({
  playlistSongsById: playlistSongsByIdReducer,
  player: playerRedicer,
  playlistDetails: playlistDetailsReducer,
});

export default rootReducer;
