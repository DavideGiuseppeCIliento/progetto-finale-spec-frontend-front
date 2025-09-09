// # IMPORT DIPENDENCES
import { BrowserRouter, Route, Routes } from "react-router-dom";

// # IMPORT PAGES
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";

// # IMPORT LAYOUT
import DefaultLayout from "./layouts/DefaultLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
