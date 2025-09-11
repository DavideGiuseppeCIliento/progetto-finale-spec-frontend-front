// # IMPORT DIPENDENCES
import { BrowserRouter, Route, Routes } from "react-router-dom";

// # IMPORT PAGES
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import DetailGamePage from "./pages/DetailGamePage";

// # IMPORT LAYOUT
import DefaultLayout from "./layouts/DefaultLayout";

// # IMPORT CONTEXT
import { WishlistProvider } from "./contexts/wishlistContext";

export default function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/:id" element={<DetailGamePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  );
}
