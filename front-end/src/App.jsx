// # IMPORT DIPENDENCES
import { BrowserRouter, Route, Routes } from "react-router-dom";

// # IMPORT PAGES
import HomePage from "./pages/HomePage";

// # IMPORT LAYOUT
import DefaultLayout from "./layouts/DefaultLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
