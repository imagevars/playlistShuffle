const initialState = {
  isPlaying: true,
  previousSong: "",
  currentSong: "",
  nextSong: "",
  isShuffleActive: false,
  isLoopActive: false,
  currentActivePlaylistId: "",
};

export default function playerRedicer(state = initialState, action) {
  switch (action.type) {
    case "player/previousSong": {
      return state;
    }
    case "player/isPlaying":
      return { ...state, isPlaying: action.payload };
    case "player/isLoopActive":
      return { ...state, isLoopActive: action.payload };

    case "player/isShuffleActive": {
      return { ...state, isShuffleActive: action.payload };
    }

    case "player/previousSong": {
      return { ...state, previousSong: action.payload };
    }
    case "player/currentSong": {
      return { ...state, currentSong: action.payload };
    }
    case "player/nextSong": {
      return { ...state, nextSong: action.payload };
    }
    case "player/setcurrentActivePlaylistId": {
      return { ...state, currentActivePlaylistId: action.payload };
    }
    
    default:
      return state;
  }
}
