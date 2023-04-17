import axios from "axios";

const fetchPlaylistData = async (id, etag) => {
  const baseApiUrl = "https://www.googleapis.com/youtube/v3";
  const apikey = "AIzaSyA8JtiLpC8D9nhMK44CRTciv64H1MNFNDw";

  let playlistDetailsObject = {};
  try {
    const playlistDetailsQuery = await axios.get(`${baseApiUrl}/playlists`, {
      params: {
        part: "snippet",
        id: id,
        key: apikey,
      },
    });
    playlistDetailsObject = {
      playlistName: playlistDetailsQuery.data.items[0].snippet.title,
      playlistId: playlistDetailsQuery.data.items[0].id,
      playlistImage:
        playlistDetailsQuery.data.items[0].snippet.thumbnails.medium.url,
      playlistEtag: etag,
    };
  } catch (error) {
    console.log("Error fetching data: ", error);
  }

  return playlistDetailsObject;
};
export default fetchPlaylistData;
