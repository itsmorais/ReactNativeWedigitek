export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FAVORITE = 'SET_FAVORITE';
export const TESTE = 'TESTE'
export const SET_RESTAURANTS = 'SET_RESTAURANTS'
export const TOOGLE_RESTAURANT_FAVORITE = 'TOOGLE_RESTAURANT_FAVORITE'


export const toggleFavorite = (restaurant) => {
  return {
    type: TOGGLE_FAVORITE,
    payload: restaurant,
  };
}

export const setFavorites = (favorites) => {
  return{
    type: SET_FAVORITE,
    payload: favorites
  }
}

export const getRestaurants = (params) => {
  return{
    type: TESTE,
    payload: params
  }
}

export const setRestaurants = (params) =>{
  return{
    type: SET_RESTAURANTS,
    payload:params
  }
}

export const updateRestaurantFavorite = (params) =>{
  return{
    type:TOOGLE_RESTAURANT_FAVORITE,
    payload:params
  }
}
