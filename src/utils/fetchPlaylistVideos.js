import axios from 'axios';

const fetchPlaylistVideos = async (id, etag) => {
  const responseArr = [];
  const baseApiUrl = 'https://www.googleapis.com/youtube/v3';
  const apiKey = 'AIzaSyA8JtiLpC8D9nhMK44CRTciv64H1MNFNDw';
  let responseEtag = '';
  try {
    let nextToken = '';

    do {
      /* eslint-disable no-await-in-loop */
      const responseListItems = await axios.get(`${baseApiUrl}/playlistItems`, {
        headers: {
          'If-None-Match': etag,
        },
        params: {
          part: 'snippet',
          maxResults: 50,
          key: apiKey,
          pageToken: nextToken,
          playlistId: id,
          fields:
            'etag,nextPageToken,items(snippet(title,videoOwnerChannelTitle,position, resourceId(videoId))),pageInfo',
        },
      });
      responseArr.push(...responseListItems.data.items);
      if (responseEtag === '') {
        responseEtag = responseListItems.data.etag;
      }
      if (responseListItems.data.nextPageToken) {
        nextToken = responseListItems.data.nextPageToken;
        /* eslint-enable no-await-in-loop */
      } else nextToken = '';
    } while (nextToken);
  } catch (error) {
    if (error.response === undefined) {
      return undefined;
    }
    if (error.response.status === 304) {
      return error.response.status;
    } if (error.response.status === 404) {
      return error.response.status;
    } if (error.response.status === 403) {
      return error.response.status;
    }
    if (error.response.status === 500) {
      return 404;
    }
    // eslint-disable-next-line
    console.log('Error ', error.response);
    return 404;
  }
  const dataReturned = {
    playlistEtag: responseEtag,
    responseArrToAdd: responseArr,
    currentSong: responseArr[0].snippet.resourceId.videoId,
  };

  return dataReturned;
};

export default fetchPlaylistVideos;
