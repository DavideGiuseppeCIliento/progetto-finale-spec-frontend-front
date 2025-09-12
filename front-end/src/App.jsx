// # IMPORT DIPENDENCES
import { BrowserRouter, Route, Routes } from "react-router-dom";

// # IMPORT PAGES
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import DetailGamePage from "./pages/DetailGamePage";
import WishlistPage from "./pages/WishlistPage";

// # IMPORT LAYOUT
import DefaultLayout from "./layouts/DefaultLayout";

// # IMPORT CONTEXT PROVIDER
import { WishlistProvider } from "./contexts/wishlistContext";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/games/:id" element={<DetailGamePage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  );
}
