import {
  PLAYLISTDETAILS_ADDTOPLAYLISTDETAILS,
  PLAYLISTDETAILS_DELETEFROMPLAYLISTDETAILS,
  PLAYLISTDETAILS_ETAG,
  PLAYLISTDETAILS_LASTPLAYED,
  PLAYLISTDETAILS_LASTPLAYEDALL,

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

export const lastPlayedPlaylistDetails = (payload) => ({
  type: PLAYLISTDETAILS_LASTPLAYED,
  payload,
});

export const lastPlayedPlaylistDetailsAll = () => ({
  type: PLAYLISTDETAILS_LASTPLAYEDALL,
});
