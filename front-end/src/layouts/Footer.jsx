// src/components/Footer.jsx
import { NavLink } from "react-router-dom";

export default function Footer({
  brand = "GFY | GameForYou",
  year = new Date().getFullYear(),
}) {
  return (
    <footer className="mt-auto bg-dark text-white-50 pt-5 pb-4">
      <div className="container">
        <div className="row g-4">
          {/* Brand + descrizione */}
          <div className="col-12 col-md-4">
            <h5 className="text-white mb-2">{brand}</h5>
            <p className="mb-3">
              Il tuo comparatore di videogiochi: cerca, filtra, confronta e
              salva i preferiti.
            </p>
            <div className="d-flex gap-3 fs-5">
              <a
                href="#"
                aria-label="Facebook"
                className="text-white-50 hover-opacity"
              >
                <i className="bi bi-facebook" />
              </a>
              <a href="#" aria-label="Instagram" className="text-white-50">
                <i className="bi bi-instagram" />
              </a>
              <a href="#" aria-label="X" className="text-white-50">
                <i className="bi bi-twitter-x" />
              </a>
              <a href="#" aria-label="YouTube" className="text-white-50">
                <i className="bi bi-youtube" />
              </a>
            </div>
          </div>

          {/* Navigazione */}
          <div className="col-6 col-md-2">
            <h6 className="text-white mb-3">Navigazione</h6>
            <ul className="list-unstyled d-grid gap-2">
              <li>
                <NavLink
                  className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                  to="/games"
                >
                  Games
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                  to="/popular"
                >
                  Popular
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                  to="/favorites"
                >
                  Preferiti
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Risorse */}
          <div className="col-6 col-md-3">
            <h6 className="text-white mb-3">Risorse</h6>
            <ul className="list-unstyled d-grid gap-2">
              <li>
                <NavLink
                  className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                  to="/compare"
                >
                  Comparatore
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                  to="/about"
                >
                  Chi siamo
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                  to="/contact"
                >
                  Contatti
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                  to="/privacy"
                >
                  Privacy
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Newsletter (facoltativa) */}
          <div className="col-12 col-md-3">
            <h6 className="text-white mb-3">Newsletter</h6>
            <form className="d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="La tua email"
                aria-label="Email"
              />
              <button className="btn btn-primary btn-sm" type="submit">
                Iscriviti
              </button>
            </form>
            <small className="d-block mt-2">
              Niente spam, solo novità sui giochi.
            </small>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <small>
            © {year} {brand}. Tutti i diritti riservati.
          </small>
          <a
            href="#top"
            className="btn btn-outline-light btn-sm"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Torna su ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
