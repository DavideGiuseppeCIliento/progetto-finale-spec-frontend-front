// # IMPORT DIPENDENCES
import { Outlet } from "react-router-dom";

// # IMPORT COMPONENTS
import Header from "./Header";
import Footer from "./Footer";

export default function DefaultLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Header />
      </header>
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
