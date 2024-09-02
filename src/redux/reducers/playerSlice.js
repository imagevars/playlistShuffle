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
  PLAYER_SET_THEME,
  PLAYER_VOLUME,
  PLAYER_SEEK_TO,
  PLAYER_SEEKING,
  PLAYER_ARTIST,
  PLAYER_TITLE,
  PLAYER_SEEK_KEYBOARD,
  PLAYER_IS_PL_LOADING,
  PLAYER_SEARCH_WORDS,
  PLAYER_REVERSE_DURATION,
} from '../constants/playerTypes';

const initialState = {
  isPlLoading: false,
  isPlaying: false,
  theme: 'image',
  currentSong: '',
  isShuffleActive: false,
  isLoopActive: false,
  currentActivePlaylistId: '',
  searchWords: '',
  isMutedActive: false,
  progress: 0,
  videoDuration: 0,
  videoPercentage: 0,
  volume: 1,
  seeking: false,
  seekTo: 0,
  seekKeyboard: 0,
  title: '',
  artist: '',
  reverseDuration: false,
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
    case PLAYER_SET_THEME: {
      return { ...state, theme: action.payload };
    }
    case PLAYER_VOLUME: {
      return { ...state, volume: action.payload };
    }
    case PLAYER_SEEKING: {
      return { ...state, seeking: action.payload };
    }
    case PLAYER_SEEK_TO: {
      return { ...state, seekTo: action.payload };
    }
    case PLAYER_SEEK_KEYBOARD: {
      return { ...state, seekKeyboard: action.payload };
    }
    case PLAYER_ARTIST: {
      return { ...state, artist: action.payload };
    }
    case PLAYER_TITLE: {
      return { ...state, title: action.payload };
    }
    case PLAYER_IS_PL_LOADING: {
      return { ...state, isPlLoading: action.payload };
    }
    case PLAYER_SEARCH_WORDS: {
      return { ...state, searchWords: action.payload };
    }
    case PLAYER_REVERSE_DURATION: {
      return { ...state, reverseDuration: action.payload};
    }
    default:
      return state;
  }
}
