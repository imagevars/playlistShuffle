import { combineReducers } from "redux";
import playerRedicer  from "./reducers/playerSlice";
import playlistDetailsReducer from "./reducers/playlistDetailsSlice";
import playlistSongsByIdReducer from "./reducers/playlistSongsByIdSlice";
const rootReducer = combineReducers({
  playlistSongsById: playlistSongsByIdReducer,
  player: playerRedicer,
  playlistDetails: playlistDetailsReducer,
});

export default rootReducer;
