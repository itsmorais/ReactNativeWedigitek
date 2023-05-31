export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggleFavorite = (restaurant) => {
  return {
    type: TOGGLE_FAVORITE,
    payload: restaurant,
  };
};