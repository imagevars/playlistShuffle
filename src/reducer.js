import { combineReducers } from "redux";
import playerRedicer  from "./features/playerSlice";
import playlistReducer from "./features/playlistSlice";
import songsReducer from "./features/songsSlice";
import playlistDetailsReducer from "./features/playlistDetailsSlice";

const rootReducer = combineReducers({
  playlist: playlistReducer,
  songs: songsReducer,
  player: playerRedicer,
  playlistDetails: playlistDetailsReducer,
});

export default rootReducer;
