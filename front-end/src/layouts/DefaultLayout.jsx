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
        <div className="container py-4">
          <Outlet />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
