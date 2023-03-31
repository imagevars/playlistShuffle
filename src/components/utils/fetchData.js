import axios from "axios";

export const fetchData = async (id) => {

  let responseArr = [];
  const baseApiUrl = "https://www.googleapis.com/youtube/v3";
  const apikey = "AIzaSyCEd92zTlhahyrKuzAHBRlY56UdcwSKCV0";

  const playlistDetails = await axios.get(`${baseApiUrl}/playlists`, {
    params: {
      part: "snippet",
      id: id,
      key: apikey,
    },
  });
  const playlistDetailsObject = {
    playlistName: playlistDetails.data.items[0].snippet.title,
    playlistId: playlistDetails.data.items[0].id,
    PlaylistImage: playlistDetails.data.items[0].snippet.thumbnails.medium.url,
  };
  try {
    let nextToken = "";

    // addToPlaylistDetails(playlistDetailsObject)

    do {
      const responseListItems = await axios.get(`${baseApiUrl}/playlistItems`, {
        params: {
          part: "snippet",
          maxResults: 50,
          key: apikey,
          pageToken: nextToken,
          playlistId: id,
        },
      });
      console.log("AXIOS RESPONSE", responseListItems);
      responseArr.push(...responseListItems.data.items);
      if (responseListItems.data.nextPageToken) {
        nextToken = responseListItems.data.nextPageToken;
      } else nextToken = "";
    } while (nextToken);
    // addSongs(responseArr);
    // currentSong(responseArr[0].snippet.resourceId.videoId);
    // nextSong(responseArr[1].snippet.resourceId.videoId);
  } catch (error) {
    console.error(error);
  }
  const dataReturned = {
    playlistDetailsObject: playlistDetailsObject,
    responseArrToAdd: responseArr,
    currentSong: responseArr[0].snippet.resourceId.videoId,
    nextSong: responseArr[1].snippet.resourceId.videoId,
  };

  return dataReturned;
};
