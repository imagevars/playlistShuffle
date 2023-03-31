const initialState = [];

export default function songsReducer(state = initialState, action) {
  switch (action.type) {
    case "songs/addSongs": {
      console.log(action.payload)
      return action.payload;
    };

    case "songs/removeSong": {
      return state.filter((ele) => ele.id !== action.payload);
    }
    
    default:
      return state;
  }
}
