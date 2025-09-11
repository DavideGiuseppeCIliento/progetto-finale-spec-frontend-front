// # IMPORT DIPENDENCES
import { memo, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// # IMPORT CONTEXT
import { WishlistContext } from "../contexts/wishlistContext";

function CardGame({ title, category, id }) {
  const { wishlist, setWishlist } = useContext(WishlistContext); // Valori CONTEXT

  const isInWishlist = wishlist.some((item) => item.id === id);

  // --- GESTIONE WISHLIST
  function handleWishlist(e) {
    e.preventDefault?.();
    e.stopPropagation?.(); // STOP propagazione su elemetni genitori
    console.log("CARICA FUNZIONE");

    setWishlist(
      (prev) =>
        prev.some((x) => x.id === id)
          ? prev.filter((x) => x.id !== id) // Se esiste lo elimino
          : [...prev, { title, category, id }] // Se non esiste lo aggiungo
    );
  }

  return (
    <div
      className="card h-100 shadow-sm border-light position-relative"
      style={{ width: "18rem" }}
    >
      <div className="card-body pe-5">
        <h5 className="card-title">
          <strong>{title.toUpperCase()}</strong>
        </h5>
        <p className="card-text">{category}</p>
        <Link to={`${id}`} className="btn btn-dark bg-gradient rounded-4">
          Scopri di più
        </Link>
      </div>

      {/* Cuore in basso a destra */}
      <button
        type="button"
        className="btn btn-link p-0 border-0 position-absolute bottom-0 end-0 m-2 heart-btn"
        aria-label="Aggiungi ai preferiti"
        title="Aggiungi ai preferiti"
      >
        {!isInWishlist ? (
          <i
            className="bi bi-heart fs-4 text-dark"
            onClick={handleWishlist}
          ></i>
        ) : (
          <i
            className="bi bi-heart-fill fs-4 text-dark"
            onClick={handleWishlist}
          ></i>
        )}
      </button>
    </div>
  );
}

export default memo(CardGame);
