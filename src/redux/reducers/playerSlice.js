import {
  PLAYER_IS_PLAYING,
  PLAYER_IS_LOOP_ACTIVE,
  PLAYER_IS_SHUFFLE_ACTIVE,
  PLAYER_PREVIOUS_SONG,
  PLAYER_CURRENT_SONG,
  PLAYER_NEXT_SONG,
  PLAYER_SET_CURRENT_ACTIVE_PLAYLIST,
  PLAYER_IS_MUTED_ACTIVE,
  PLAYER_SET_PROGRESS,
  PLAYER_VIDEO_DURATION,
  PLAYER_SET_PERCENTAGE,
  PLAYER_IS_FULL_SCREEN_ACTIVE,
  PLAYER_REMEMBER_LAST_VIDEO,
} from '../constants/playerTypes';

const initialState = {
  isPlaying: true,
  previousSong: '',
  currentSong: '',
  nextSong: '',
  isShuffleActive: false,
  isLoopActive: false,
  currentActivePlaylistId: '',
  isMutedActive: false,
  progress: '0',
  videoDuration: '0',
  videoPercentage: '0',
  isFullScreenActive: false,
  rememberLastVideo: false,
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

    case PLAYER_PREVIOUS_SONG: {
      return { ...state, previousSong: action.payload };
    }
    case PLAYER_CURRENT_SONG: {
      return { ...state, currentSong: action.payload };
    }
    case PLAYER_NEXT_SONG: {
      return { ...state, nextSong: action.payload };
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
    default:
      return state;
  }
}
