import axios from "axios";

export default async function fetchPlaylistData(id, etag) {
  const baseApiUrl = "https://www.googleapis.com/youtube/v3";
  const apiKey = "AIzaSyBh9SQbV-C3tU6hAq_kuwQDuYH-y8hEz6w";

  let playlistDetailsObject = {};
  try {
    const playlistDetailsQuery = await axios.get(`${baseApiUrl}/playlists`, {
      params: {
        part: "snippet",
        id,
        key: apiKey,
      },
    });
    playlistDetailsObject = {
      playlistName: playlistDetailsQuery.data.items[0].snippet.title,
      playlistId: playlistDetailsQuery.data.items[0].id,
      playlistImage:
        playlistDetailsQuery.data.items[0].snippet.thumbnails.medium.url,
      playlistEtag: etag,
      currentIndex: 0,
    };
  } catch (error) {
    // eslint-disable-next-line
    console.log("Error fetching data: ", error);
    return null;
  }

  return playlistDetailsObject;
}
