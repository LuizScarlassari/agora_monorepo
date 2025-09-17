const FAVORITES_KEY = 'favoriteDeputies';

// Returns an array of favorite deputy IDs
export const getFavoriteDeputies = (): number[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Failed to parse favorites from localStorage", error);
    return [];
  }
};

// Checks if a deputy is in favorites
export const isDeputyFavorite = (deputyId: number): boolean => {
  const favorites = getFavoriteDeputies();
  return favorites.includes(deputyId);
};

// Adds a deputy to favorites
export const addFavoriteDeputy = (deputyId: number): void => {
  const favorites = getFavoriteDeputies();
  if (!favorites.includes(deputyId)) {
    const newFavorites = [...favorites, deputyId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  }
};

// Removes a deputy from favorites
export const removeFavoriteDeputy = (deputyId: number): void => {
  const favorites = getFavoriteDeputies();
  const newFavorites = favorites.filter(id => id !== deputyId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
};
