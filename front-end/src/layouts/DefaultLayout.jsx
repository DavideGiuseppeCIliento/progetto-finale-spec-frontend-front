// # IMPORT DIPENDENCES
import { Outlet } from "react-router-dom";

// # IMPORT COMPONENTS
import Header from "./Header";
import Footer from "./Footer";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
