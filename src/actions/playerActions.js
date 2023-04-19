import {
  PLAYER_ISPLAYING,
  PLAYER_PREVIOUSSONG,
  PLAYER_CURRENTSONG,
  PLAYER_NEXTSONG,
  PLAYER_ISLOOPACTIVE,
  PLAYER_ISMUTEDACTIVE,
  PLAYER_ISSHUFFLEACTIVE,
  PLAYER_SETCURRENTACTIVEPLAYLIST,
  PLAYER_VIDEODURATION,
  PLAYER_SETPROGRESS,
  PLAYER_SETPERCENTAGE,
  PLAYER_ISFULLSCREENACTIVE,
} from "../constants/playerTypes";

export const isPlaying = (payload) => ({ type: PLAYER_ISPLAYING, payload });

export const previousSong = (payload) => ({
  type: PLAYER_PREVIOUSSONG,
  payload,
});

export const currentSong = (payload) => ({ type: PLAYER_CURRENTSONG, payload });

export const nextSong = (payload) => ({ type: PLAYER_NEXTSONG, payload });

export const isLoopActive = (payload) => ({
  type: PLAYER_ISLOOPACTIVE,
  payload,
});

export const isShuffleActive = (payload) => ({
  type: PLAYER_ISSHUFFLEACTIVE,
  payload,
});

export const isMutedActive = (payload) => ({
  type: PLAYER_ISMUTEDACTIVE,
  payload,
});

export const setcurrentActivePlaylistId = (payload) => ({
  type: PLAYER_SETCURRENTACTIVEPLAYLIST,
  payload,
});

export const setVideoDuration = (payload) => ({
  type: PLAYER_VIDEODURATION,
  payload,
});

export const setProgress = (payload) => ({
  type: PLAYER_SETPROGRESS,
  payload,
});

export const setPercentage = (payload) => ({
  type: PLAYER_SETPERCENTAGE,
  payload,
});

export const isFullScreenActive = (payload) => ({
  type: PLAYER_ISFULLSCREENACTIVE,
  payload,
});
