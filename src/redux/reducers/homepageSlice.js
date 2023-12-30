import HOMEPAGE_SEARCH_INPUT from '../constants/homepageTypes';

const initialState = {
  searchInput: '',
};

export default function homepageReducer(state = initialState, action) {
  switch (action.type) {
    case HOMEPAGE_SEARCH_INPUT:
      return { searchInput: action.payload };
    default:
      return state;
  }
}
