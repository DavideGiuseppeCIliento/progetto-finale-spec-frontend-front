// # IMPORT DIPENDENCES
import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();
const STORAGE_KEY = "wishlist"; //chiave STORAGE

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    //Funzione che definisce wishlist iniziale
    try {
      const raw = localStorage.getItem(STORAGE_KEY); // Leggo Item
      return raw ? JSON.parse(raw) : []; //Trasformo Item in oggetti
    } catch {
      return []; //Inizializzo se vuoto o corrotto
    }
  });

  //  --- Salva su LOCALSTORAGE quando cambia wishlist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist)); // Quando cambia wishlist salvo
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
