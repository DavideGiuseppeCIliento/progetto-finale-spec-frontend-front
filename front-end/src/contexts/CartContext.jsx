// # IMPORT DIPENDENCES
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();
const STORAGE_KEY = "cart"; //chiave STORAGE

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    //Funzione che definisce wishlist iniziale
    try {
      const raw = localStorage.getItem(STORAGE_KEY); // Leggo Item
      return raw ? JSON.parse(raw) : []; //Se vuoto inizializzo
    } catch {
      return []; //Inizializzo se vuoto o corrotto
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); // Quando cambia cart salvo
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
