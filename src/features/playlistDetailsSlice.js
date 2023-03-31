const initialState = [];

export default function playlistDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case "playlistDetails/addToPlaylistDetails": {
      if(state.filter(element => element.playlistId === action.payload.playlistId).length ) {
        return state
      } else return [...state, action.payload];
    }
    case "playlistDetails/deleteFromPlaylistDetails": {
      return state.filter(element => element.playlistId !== action.payload)
    }
    default:
      return state;
  }
}
