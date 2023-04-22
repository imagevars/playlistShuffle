import {
  PLAYLISTSONGS_ADDSONGSBYPLAYLISTID,
  PLAYLISTSONGS_REMOVEPLAYLISTSONGSBYID,
} from "../constants/playlistSongsByIdTypes";

export const addSongsByPlaylistID = (payload) => ({
  type: PLAYLISTSONGS_ADDSONGSBYPLAYLISTID,
  payload,
});

export const removePlaylistSongsById = (payload) => ({
  type: PLAYLISTSONGS_REMOVEPLAYLISTSONGSBYID,
  payload,
});
