// # IMPORT DIPENDENCES
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="header-site navbar navbar-expand-lg navbar-dark bg-dark px-5">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Games
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Popular
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
