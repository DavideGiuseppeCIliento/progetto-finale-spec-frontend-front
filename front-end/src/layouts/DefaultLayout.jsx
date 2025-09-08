// # IMPORT DIPENDENCES
import { Outlet } from "react-router-dom";

// # IMPORT COMPONENTS
import Header from "./Header";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
