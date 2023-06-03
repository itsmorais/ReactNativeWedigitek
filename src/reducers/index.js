import { combineReducers } from 'redux';
import { TOGGLE_FAVORITE, SET_FAVORITE, SET_RESTAURANTS, TOOGLE_RESTAURANT_FAVORITE } from '../actions';
import AsyncStorage from '@react-native-async-storage/async-storage';


const favoritesReducer = (state = [], action) => {
  switch (action.type) {


    case SET_FAVORITE:
      state = [...action.payload]
      return state


    case TOGGLE_FAVORITE:
      const existingIndex = state.findIndex((id) => id === action.payload._id);



      if (existingIndex !== -1) {
        state = [...state.filter((id) => id !== action.payload._id)]
      } else {

        state = [...state, action.payload._id]

      }
      AsyncStorage.setItem("favorites", JSON.stringify(state))

      return state;



    default:
      return state;
  }
};


const restaurantsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_RESTAURANTS:
      let { restaurants, favorites } = action.payload

      restaurants = restaurants.map((restaurant) => {
        const isFavorite = favorites.findIndex(id => id == restaurant._id) > - 1
        return {
          ...restaurant,
          isFavorite

        }
      })

      state = [
        ...state,
        ...restaurants
      ]

      return state


    case TOOGLE_RESTAURANT_FAVORITE:
      state = [...state.map((restaurant) => {
        if (restaurant._id == action.payload.id) {
          return {
            ...restaurant,
            isFavorite: !restaurant.isFavorite
          }
        }
        return restaurant
      })]
      return state




    default:
      return state
  }

}

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  restaurants: restaurantsReducer,
});

export default rootReducer;
