import axios from "axios";

export default async function fetchPlaylistVideos(id, etag) {
  const responseArr = [];
  const baseApiUrl = "https://www.googleapis.com/youtube/v3";
  const apiKey = "AIzaSyD4nA8bLUU8rUqx6dZwIOV7x6EXyFPru9w";
  let responseEtag = "";
  try {
    let nextToken = "";
    let timesInLoop = 0;
    do {
      /* eslint-disable no-await-in-loop */
      const responseListItems = await axios.get(`${baseApiUrl}/playlistItems`, {
        headers: {
          "If-None-Match": etag,
        },
        params: {
          part: "snippet",
          maxResults: 50,
          key: apiKey,
          pageToken: nextToken,
          playlistId: id,
          fields:
            "etag,nextPageToken,items(snippet(title,videoOwnerChannelTitle,position, resourceId(videoId))),pageInfo",
        },
      });
      responseArr.push(...responseListItems.data.items);
      timesInLoop += 1;
      // For now
      if (timesInLoop >= 105) {
        // eslint-disable-next-line
        console.log("Infinite loop");
        break;
      }
      if (responseEtag === "") {
        responseEtag = responseListItems.data.etag;
      }
      if (responseListItems.data.nextPageToken) {
        nextToken = responseListItems.data.nextPageToken;
      } else nextToken = "";
    } while (nextToken);
  } catch (error) {
    if (error.response === undefined) {
      return undefined;
    }
    if (error.response.status === 304) {
      return error.response.status;
    }
    if (error.response.status === 404) {
      return error.response.status;
    }
    if (error.response.status === 403) {
      return error.response.status;
    }
    if (error.response.status === 500) {
      return 404;
    }
    // eslint-disable-next-line
    console.log("Error ", error.response);
    return 404;
  }
  const dataReturned = {
    playlistEtag: responseEtag,
    responseArrToAdd: responseArr,
    currentSong: responseArr[0].snippet.resourceId.videoId,
  };

  return dataReturned;
}
