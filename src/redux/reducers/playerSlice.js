import {
  PLAYER_IS_PLAYING,
  PLAYER_IS_LOOP_ACTIVE,
  PLAYER_IS_SHUFFLE_ACTIVE,
  PLAYER_CURRENT_SONG,
  PLAYER_SET_CURRENT_ACTIVE_PLAYLIST,
  PLAYER_IS_MUTED_ACTIVE,
  PLAYER_SET_PROGRESS,
  PLAYER_VIDEO_DURATION,
  PLAYER_SET_PERCENTAGE,
  PLAYER_IS_FULL_SCREEN_ACTIVE,
  PLAYER_REMEMBER_LAST_VIDEO,
  PLAYER_ISDARKMODEACTIVE,
} from '../constants/playerTypes';

const initialState = {
  isPlaying: true,
  darkMode: false,
  currentSong: '',
  isShuffleActive: false,
  isLoopActive: false,
  currentActivePlaylistId: '',
  isMutedActive: false,
  progress: '0',
  videoDuration: '0',
  videoPercentage: '0',
  isFullScreenActive: false,
  rememberLastVideo: true,
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_IS_PLAYING:
      return { ...state, isPlaying: action.payload };
    case PLAYER_IS_LOOP_ACTIVE:
      return { ...state, isLoopActive: action.payload };
    case PLAYER_IS_SHUFFLE_ACTIVE: {
      return { ...state, isShuffleActive: action.payload };
    }
    case PLAYER_CURRENT_SONG: {
      return { ...state, currentSong: action.payload };
    }
    case PLAYER_SET_CURRENT_ACTIVE_PLAYLIST: {
      return { ...state, currentActivePlaylistId: action.payload };
    }
    case PLAYER_IS_MUTED_ACTIVE: {
      return { ...state, isMutedActive: action.payload };
    }
    case PLAYER_SET_PROGRESS: {
      return { ...state, progress: action.payload };
    }
    case PLAYER_VIDEO_DURATION: {
      return { ...state, videoDuration: action.payload };
    }
    case PLAYER_SET_PERCENTAGE: {
      return { ...state, videoPercentage: action.payload };
    }
    case PLAYER_IS_FULL_SCREEN_ACTIVE: {
      return { ...state, isFullScreenActive: action.payload };
    }
    case PLAYER_REMEMBER_LAST_VIDEO: {
      return { ...state, rememberLastVideo: action.payload };
    }
    case PLAYER_ISDARKMODEACTIVE: {
      return { ...state, darkMode: action.payload };
    }
    default:
      return state;
  }
}
