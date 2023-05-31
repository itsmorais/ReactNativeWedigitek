import { combineReducers } from 'redux';
import { TOGGLE_FAVORITE } from '../actions';

const favoritesReducer = (state = [], action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.findIndex((restaurant) => restaurant._id === action.payload._id);
      if (existingIndex !== -1) {
        return state.filter((restaurant) => restaurant._id !== action.payload._id);
      } else {
        return [...state, action.payload];
      }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

export default rootReducer;
