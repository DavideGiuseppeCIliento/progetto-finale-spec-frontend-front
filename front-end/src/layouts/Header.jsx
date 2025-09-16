// # IMPORT DIPENDENCES
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

// # IMPORT CONTEXT
import { WishlistContext } from "../contexts/wishlistContext";
import { CartContext } from "../contexts/CartContext";

export default function Header() {
  const location = useLocation(); // Leggiamo l'url per il colore dell'header
  const isHome = location.pathname === "/"; // Siamo in HOME?

  // --- GESTIONE CUORE WISHLIST
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);
  const isWishlistFull = wishlist.length > 0;
  const isCartFull = cart.length > 0;

  // --- GESTIONE REINDIRIZZAMENTO INPUT
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  function redirectSearchGame(e) {
    e.preventDefault();
    navigate(`/games?search=${inputValue}`); // Passo la query
  }

  return (
    <nav
      className={`header-site navbar navbar-expand-lg navbar-dark px-5 pt-4 ${
        isHome ? "bg-transparent" : "bg-dark" // Se siamo in HOME l'header è trasparente
      }`}
    >
      <NavLink className="navbar-brand" to="/">
        GFY | GameForYou
      </NavLink>

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
        {/* Menu di sinistra */}
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active fw-bold" : ""}`
              }
              to="/"
              end
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active fw-bold" : ""}`
              }
              to="/games"
            >
              Games
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active fw-bold" : ""}`
              }
              to="/contacts"
            >
              Contacts
            </NavLink>
          </li>
        </ul>

        {/* ================= Input di destra ===============*/}
        <form
          className="d-flex align-items-center"
          role="search"
          onSubmit={redirectSearchGame}
        >
          <input
            className="form-control me-2 search-input-home"
            type="search"
            placeholder="Ricerca"
            aria-label="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {/* Icone social */}
        </form>
        <div className="d-flex gap-3 ms-3">
          <a
            href="https://www.facebook.com/profile.php?id=100001672939389"
            className="text-white fs-5"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            to="https://www.facebook.com/profile.php?id=100001672939389"
            className="text-white fs-5"
          >
            <i className="bi bi-instagram"></i>
          </a>
        </div>

        {/* GESTIONE ICCONE CART + WISHLIST */}
        <div className="d-flex gap-3 ms-3">
          {!isCartFull ? (
            <NavLink to="/cart" className="text-white fs-5">
              <i className="bi bi-cart fs-4 text-light"></i>
            </NavLink>
          ) : (
            <NavLink to="/cart" className="text-white fs-5">
              <i className="bi bi-cart-fill fs-4 text-light"></i>
              <span class="badge text-bg-warning gadge-cart">
                {cart.length}
              </span>
            </NavLink>
          )}
          {!isWishlistFull ? (
            <NavLink to="/wishlist" className="text-white fs-5">
              <i className="bi bi-heart fs-4 text-light"></i>
            </NavLink>
          ) : (
            <NavLink to="/wishlist" className="text-white fs-5">
              <i className="bi bi-heart-fill fs-4 text-light"></i>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
