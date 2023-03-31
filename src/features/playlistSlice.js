const initialState = [];

export default function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case "playlist/addPlaylist": {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
