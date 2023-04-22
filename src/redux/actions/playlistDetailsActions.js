import {
  PLAYLISTDETAILS_ADDTOPLAYLISTDETAILS,
  PLAYLISTDETAILS_DELETEFROMPLAYLISTDETAILS,
  PLAYLISTDETAILS_ETAG,
} from "../constants/playlistDetailsTypes";

export const addToPlaylistDetails = (payload) => ({
  type: PLAYLISTDETAILS_ADDTOPLAYLISTDETAILS,
  payload,
});

export const deleteFromPlaylistDetails = (payload) => ({
  type: PLAYLISTDETAILS_DELETEFROMPLAYLISTDETAILS,
  payload,
});

export const modifyEtagInPlaylistDetailsById = (payload) => ({
  type: PLAYLISTDETAILS_ETAG,
  payload,
});
