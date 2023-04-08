import axios from "axios";
const fetchPlaylistVideos = async (id, etag) => {
  let responseArr = [];
  const baseApiUrl = "https://www.googleapis.com/youtube/v3";
  const apikey = "AIzaSyA8JtiLpC8D9nhMK44CRTciv64H1MNFNDw";
  let responseEtag = "";
  try {
    let nextToken = "";

    do {
      const responseListItems = await axios.get(`${baseApiUrl}/playlistItems`, {
        headers: {
          "If-None-Match": etag,
        },
        params: {
          part: "snippet",
          maxResults: 50,
          key: apikey,
          pageToken: nextToken,
          playlistId: id,
          fields:
            "etag,nextPageToken,items(snippet(title,videoOwnerChannelTitle,position, thumbnails(default(url)), resourceId(videoId))),pageInfo",
        },
      });

      responseArr.push(...responseListItems.data.items);
      if (responseEtag === "") {
        responseEtag = responseListItems.data.etag;
      }
      if (responseListItems.data.nextPageToken) {
        nextToken = responseListItems.data.nextPageToken;
      } else nextToken = "";
    } while (nextToken);
  } catch (error) {
    if (error.response.status === 304) {
      console.log(
        error.response.status,
        ` The playlist was not modified so we are using the cached version`
      );

      return error.response.status;
    } else {
      console.log("Error fetching data: ", error);
    }
  }
  const dataReturned = {
    playlistEtag: responseEtag,
    responseArrToAdd: responseArr,
    currentSong: responseArr[0].snippet.resourceId.videoId,
    nextSong: responseArr[1].snippet.resourceId.videoId,
  };

  return dataReturned;
};

export default fetchPlaylistVideos;
