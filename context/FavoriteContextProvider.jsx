import { createContext, useState } from "react";

/*  Creating context here that recipes (or events in the future) can be added to favorites
    This context "wraps" the navigation in App.jsx so that every screen that needs the functionality has access to it with useContext hook
*/
export const FavoritesContext = createContext({
  ids: [],
  addToFavorites: (id) => {},
  removeFromFavorites: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoritesIds, setFavoritesIds] = useState([]);

  function addToFavorites(id) {
    setFavoritesIds((currentFavoriteIds) => [...currentFavoriteIds, id]);
  }

  function removeFromFavorites(id) {
    setFavoritesIds((currentFavoriteIds) =>
      currentFavoriteIds.filter((favoriteThingId) => favoriteThingId !== id)
    );
  }

  const favoriteConstant = {
    ids: favoritesIds,
    addToFavorites: addToFavorites,
    removeFromFavorites: removeFromFavorites,
  };

  return (
    <FavoritesContext.Provider value={favoriteConstant}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;