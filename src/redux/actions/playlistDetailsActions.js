import {
  PLAYLIST_DETAILS_ADD_TO_PLAYLIST_DETAILS,
  PLAYLIST_DETAILS_DELETE_FROM_PLAYLIST_DETAILS,
  PLAYLIST_DETAILS_ETAG,
  PLAYLIST_DETAILS_LAST_PLAYED,
  PLAYLIST_DETAILS_LAST_PLAYED_ALL,
  PLAYLIST_DETAILS_LENGTH,

} from '../constants/playlistDetailsTypes';

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

export const lastPlayedPlaylistDetails = (payload) => ({
  type: PLAYLIST_DETAILS_LAST_PLAYED,
  payload,
});

export const lastPlayedPlaylistDetailsAll = () => ({
  type: PLAYLIST_DETAILS_LAST_PLAYED_ALL,
});

export const playlistLength = (payload) => ({
  type: PLAYLIST_DETAILS_LENGTH,
  payload,
});
