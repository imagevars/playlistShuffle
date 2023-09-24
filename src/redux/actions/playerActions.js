import {
  PLAYER_IS_PLAYING,
  PLAYER_CURRENT_SONG,
  PLAYER_IS_LOOP_ACTIVE,
  PLAYER_IS_MUTED_ACTIVE,
  PLAYER_IS_SHUFFLE_ACTIVE,
  PLAYER_SET_CURRENT_ACTIVE_PLAYLIST,
  PLAYER_VIDEO_DURATION,
  PLAYER_SET_PROGRESS,
  PLAYER_SET_PERCENTAGE,
  PLAYER_SET_THEME,
  PLAYER_VOLUME,
  PLAYER_SEEK_TO,
  PLAYER_SEEKING,
  PLAYER_ARTIST,
  PLAYER_TITLE,
  PLAYER_SEEK_KEYBOARD,
  PLAYER_IS_PL_LOADING,
} from '../constants/playerTypes';

export const isPlaying = (payload) => ({ type: PLAYER_IS_PLAYING, payload });

export const currentSong = (payload) => ({
  type: PLAYER_CURRENT_SONG,
  payload,
});

export const isLoopActive = (payload) => ({
  type: PLAYER_IS_LOOP_ACTIVE,
  payload,
});

export const isShuffleActive = (payload) => ({
  type: PLAYER_IS_SHUFFLE_ACTIVE,
  payload,
});

export const isMutedActive = (payload) => ({
  type: PLAYER_IS_MUTED_ACTIVE,
  payload,
});

export const setCurrentActivePlaylistId = (payload) => ({
  type: PLAYER_SET_CURRENT_ACTIVE_PLAYLIST,
  payload,
});

export const setVideoDuration = (payload) => ({
  type: PLAYER_VIDEO_DURATION,
  payload,
});

export const setProgress = (payload) => ({
  type: PLAYER_SET_PROGRESS,
  payload,
});

export const setPercentage = (payload) => ({
  type: PLAYER_SET_PERCENTAGE,
  payload,
});

export const setTheme = (payload) => ({
  type: PLAYER_SET_THEME,
  payload,
});

export const setVolume = (payload) => ({
  type: PLAYER_VOLUME,
  payload,
});

export const setSeeking = (payload) => ({
  type: PLAYER_SEEKING,
  payload,
});

export const setSeekTo = (payload) => ({
  type: PLAYER_SEEK_TO,
  payload,
});

export const setTitle = (payload) => ({
  type: PLAYER_TITLE,
  payload,
});

export const setArtist = (payload) => ({
  type: PLAYER_ARTIST,
  payload,
});

export const setSeekKeyboard = (payload) => ({
  type: PLAYER_SEEK_KEYBOARD,
  payload,
});

export const setIsPlLoading = (payload) => ({
  type: PLAYER_IS_PL_LOADING,
  payload,
});
