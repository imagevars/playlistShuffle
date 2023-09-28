import {
  PLAYLIST_SONGS_ADD_SONGS_BY_PLAYLIST_ID,
  PLAYLIST_SONGS_REMOVE_PLAYLIST_SONGS_BY_ID,
} from '../constants/playlistSongsByIdTypes';

export const addSongsByPlaylistID = (payload) => ({
  type: PLAYLIST_SONGS_ADD_SONGS_BY_PLAYLIST_ID,
  payload,
});

export const removePlaylistSongsById = (payload) => ({
  type: PLAYLIST_SONGS_REMOVE_PLAYLIST_SONGS_BY_ID,
  payload,
});
