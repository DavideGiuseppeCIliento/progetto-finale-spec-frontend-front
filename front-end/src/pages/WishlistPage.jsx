// # IMPORT DIPENDENCES
import { useContext } from "react";
import { NavLink } from "react-router-dom";

// # IMPORT CONTEXT
import { WishlistContext } from "../contexts/wishlistContext";

// # IMPORT COMPONENTS
import CardWishlist from "../components/CardWishList";

export default function WishlistPage() {
  const { wishlist, setWishlist } = useContext(WishlistContext); // solo lettura per layout

  const hasItems = Array.isArray(wishlist) && wishlist.length > 0;

  //   console.log("ELEMENTO ", wishlist[0]);

  // --- SVUOTAMENTO WISHLIST
  function handleClearWishlist(e) {
    setWishlist([]);
  }

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <h1 className="mb-0">Wishlist</h1>
          <span className="badge text-bg-warning">{wishlist?.length ?? 0}</span>
        </div>

        <div className="ms-auto d-flex gap-2">
          <NavLink to="/games" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-1" />
            Torna ai giochi
          </NavLink>
          <button
            type="button"
            className="btn btn-outline-danger"
            // ## SVUOTAMENTO
            onClick={handleClearWishlist}
            disabled={!hasItems}
            title="Svuota wishlist"
          >
            <i className="bi bi-trash3 me-1" />
            Svuota
          </button>
        </div>
      </div>

      {/* Stato vuoto */}
      {!hasItems && (
        <div className="text-center text-muted py-5">
          <div className="display-6 mb-2">La tua wishlist è vuota</div>
          <p className="mb-4">
            Aggiungi titoli ai preferiti cliccando il{" "}
            <i className="bi bi-heart text-dark" /> sulle card.
          </p>
          <NavLink to="/games" className="btn btn-dark rounded-4">
            Scopri i giochi
          </NavLink>
        </div>
      )}

      {/* Griglia elementi */}
      {hasItems && (
        <div className="row g-4">
          {wishlist.map((item) => (
            <div key={item.id} className="col-12 col-md-4 col-md-3">
              <CardWishlist
                title={item.title}
                category={item.category}
                id={item.id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
