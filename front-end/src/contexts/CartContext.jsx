// # IMPORT DIPENDENCES
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();
const STORAGE_KEY = "cart"; //chiave STORAGE

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    //Funzione che definisce wishlist iniziale
    try {
      const raw = localStorage.getItem(STORAGE_KEY); // Leggo Item
      return raw ? JSON.parse(raw) : []; //Trasformo Item in oggetti
    } catch {
      return []; //Inizializzo se vuoto o corrotto
    }
  });
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
