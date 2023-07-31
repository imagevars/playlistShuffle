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
  PLAYER_REMEMBER_LAST_VIDEO,
  PLAYER_ISDARKMODEACTIVE,
  PLAYER_VOLUME,
  PLAYER_SEEKTO,
  PLAYER_SEEKING,
} from '../constants/playerTypes';

export const isPlaying = (payload) => ({ type: PLAYER_IS_PLAYING, payload });

export const currentSong = (payload) => ({ type: PLAYER_CURRENT_SONG, payload });

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

export const rememberLastVideo = (payload) => ({
  type: PLAYER_REMEMBER_LAST_VIDEO,
  payload,
});

export const isDarkModeActive = (payload) => ({
  type: PLAYER_ISDARKMODEACTIVE,
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
  type: PLAYER_SEEKTO,
  payload,
});
