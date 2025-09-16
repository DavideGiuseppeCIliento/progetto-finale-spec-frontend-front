// # IMPORT DIPENDENCES
import { BrowserRouter, Route, Routes } from "react-router-dom";

// # IMPORT PAGES
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import DetailGamePage from "./pages/DetailGamePage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import ContactsPage from "./pages/ContactsPage";

import DashboardPage from "./back-office/pages/dashboardPage";
import GameListPage from "./back-office/pages/GameListPage";
import NewGamePage from "./back-office/pages/NewGamePage";

// # IMPORT LAYOUT
import DefaultLayout from "./layouts/DefaultLayout";
import AdminLayout from "./back-office/layout/AdminLayout";

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
              <Route path="/cart" element={<CartPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
            </Route>

            {/* area admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="productsList" element={<GameListPage />} />
              <Route path="newGame" element={<NewGamePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  );
}
