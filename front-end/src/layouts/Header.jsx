// # IMPORT DIPENDENCES
import { NavLink, useLocation } from "react-router-dom";
import { useState, useContext, useMemo } from "react";

// # IMPORT CONTEXT
import { WishlistContext } from "../contexts/wishlistContext";

export default function Header() {
  const location = useLocation(); // Leggiamo l'url per il colore dell'header
  const isHome = location.pathname === "/"; // Siamo in HOME?

  // --- GESTIONE CUORE WISHLIST
  const { wishlist } = useContext(WishlistContext);
  const isWishlistFull = wishlist.length > 0;

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
              to="/popular"
            >
              Popular
            </NavLink>
          </li>
        </ul>

        {/* Input di destra */}
        <form className="d-flex align-items-center" role="search">
          <input
            className="form-control me-2 search-input-home"
            type="search"
            placeholder="Ricerca"
            aria-label="Search"
          />
          {/* Icone social */}
        </form>
        <div className="d-flex gap-3 ms-3">
          <NavLink to="/facebook" className="text-white fs-5">
            <i className="bi bi-facebook"></i>
          </NavLink>
          <NavLink to="/instagram" className="text-white fs-5">
            <i className="bi bi-instagram"></i>
          </NavLink>
        </div>

        <div className="d-flex gap-3 ms-3">
          <NavLink to="/cart" className="text-white fs-5">
            <i className="bi bi-cart"></i>
          </NavLink>
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
