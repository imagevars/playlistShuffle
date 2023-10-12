import {
  PLAYLIST_DETAILS_ADD_TO_PLAYLIST_DETAILS,
  PLAYLIST_DETAILS_DELETE_FROM_PLAYLIST_DETAILS,
  PLAYLIST_DETAILS_ETAG,
  PLAYLIST_DETAILS_IMAGE,
  PLAYLIST_DETAILS_LAST_PLAYED_INDEX,
  PLAYLIST_DETAILS_LENGTH,
} from "../constants/playlistDetailsTypes";

export const addToPlaylistDetails = (payload) => ({
  type: PLAYLIST_DETAILS_ADD_TO_PLAYLIST_DETAILS,
  payload,
});

export const deleteFromPlaylistDetails = (payload) => ({
  type: PLAYLIST_DETAILS_DELETE_FROM_PLAYLIST_DETAILS,
  payload,
});

export const modifyEtagInPlaylistDetailsById = (payload) => ({
  type: PLAYLIST_DETAILS_ETAG,
  payload,
});

export const lastPlayedIndexPlaylistDetails = (payload) => ({
  type: PLAYLIST_DETAILS_LAST_PLAYED_INDEX,
  payload,
});

export const setPlaylistLength = (payload) => ({
  type: PLAYLIST_DETAILS_LENGTH,
  payload,
});

export const setPlaylistImage = (payload) => ({
  type: PLAYLIST_DETAILS_IMAGE,
  payload,
});
