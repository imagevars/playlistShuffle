import { combineReducers } from 'redux';
import playerReducer from './redux/reducers/playerSlice';
import playlistDetailsReducer from './redux/reducers/playlistDetailsSlice';
import playlistSongsByIdReducer from './redux/reducers/playlistSongsByIdSlice';
import isPlaylistLoadingReducer from './redux/reducers/isPlaylistLoadingSlice';

const rootReducer = combineReducers({
  playlistSongsById: playlistSongsByIdReducer,
  player: playerReducer,
  playlistDetails: playlistDetailsReducer,
  isPlaylistLoading: isPlaylistLoadingReducer,
});

export default rootReducer;
