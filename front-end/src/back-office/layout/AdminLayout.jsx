import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    // wrapper a tutta altezza
    <div className="container-fluid p-0">
      {/* topbar opzionale */}
      <div className="bg-dark text-white py-2 px-3">
        Dashboard del tuo sito web
      </div>

      {/* riga che occupa l’intera viewport */}
      <div className="row g-0 min-vh-100">
        {/* SIDEBAR: colonna a tutta altezza */}
        <aside className="col-12 col-md-3 col-lg-2 bg-body-tertiary border-end min-vh-100 p-3">
          <nav className="list-group list-group-flush">
            <NavLink
              end
              to="/admin"
              className="list-group-item list-group-item-action"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/productsList"
              className="list-group-item list-group-item-action"
            >
              Giochi
            </NavLink>
            <NavLink
              to="/admin/newGame"
              className="list-group-item list-group-item-action"
            >
              Nuovo gioco
            </NavLink>
            <a href="/" className="list-group-item list-group-item-action">
              Vedi il sito
            </a>
            <button className="list-group-item list-group-item-action text-start text-danger">
              Esci
            </button>
          </nav>
        </aside>

        {/* CONTENUTO: riempie lo spazio restante, con scroll interno se serve */}
        <main className="col-12 col-md-9 col-lg-10 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
