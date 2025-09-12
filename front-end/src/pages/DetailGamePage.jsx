// # IMPORT DEPENDENCES
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { createPortal } from "react-dom";

// # IMPORT HOOKS
import useGames from "../hooks/useGames";
import ModalCompare from "../components/ModalCompare";

// # IMPORT CONTEXT
import { WishlistContext } from "../contexts/wishlistContext";
import { CartContext } from "../contexts/CartContext";

export default function DetailGamePage() {
  const { gameDetail, ApiRequestDetail } = useGames(); // Importo GAMES (1 game) e Funzione richiesta API
  const { id } = useParams();

  const [show, setShow] = useState(false);

  // CONTEXT DESTRUCTURING
  const { wishlist, setWishlist } = useContext(WishlistContext);
  const { cart, setCart } = useContext(CartContext);

  const isInWishlist = wishlist.some((item) => item.id === Number(id));
  const isInCart = cart.some((item) => item.id === Number(id));

  useEffect(() => {
    ApiRequestDetail(id);
  }, [id]);

  if (!gameDetail) {
    return <div className="container py-5">Caricamento…</div>;
  }

  // --- GESTIONE WISHLIST
  function handleWishlist(e) {
    e.preventDefault?.();
    e.stopPropagation?.(); // STOP propagazione su elemetni genitori
    // console.log("CARICA FUNZIONE");

    setWishlist(
      (prev) =>
        prev.some((x) => x.id === Number(id))
          ? prev.filter((x) => x.id !== Number(id)) // Se esiste lo elimino
          : [
              ...prev,
              {
                title: gameDetail.title,
                category: gameDetail.category,
                id: gameDetail.id,
              },
            ] // Se non esiste lo aggiungo
    );
  }

  // --- GESTIONE CART LIST
  function handleCartList(e) {
    e.preventDefault?.();
    e.stopPropagation?.(); // STOP propagazione su elemetni genitori
    setCart(
      (prev) =>
        prev.some((x) => x.id === Number(id))
          ? prev.filter((x) => x.id !== Number(id)) // Se esiste lo elimino
          : [
              ...prev,
              {
                title: gameDetail.title,
                category: gameDetail.category,
                id: gameDetail.id,
              },
            ] // Se non esiste lo aggiungo
    );
  }

  return (
    <div className="container py-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link to="/games">Games</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {gameDetail.title}
          </li>
        </ol>
      </nav>

      {/* Header: titolo + categoria + azioni */}
      <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
        <h1 className="mb-0">{gameDetail.title}</h1>
        {gameDetail.category && (
          <span className="badge text-bg-primary">{gameDetail.category}</span>
        )}

        <div className="ms-auto d-flex gap-2">
          {/* =================== GESTIONE COMPARATORE ==================== */}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm rounded-4"
            onClick={() => setShow(true)}
          >
            <i className="bi bi-bar-chart-steps me-1" />
            Confronta
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Colonna sinistra: cover + info rapide + trailer */}
        <div className="col-12 col-lg-5">
          <div className="card overflow-hidden">
            {gameDetail.image ? (
              <img
                src={gameDetail.image}
                alt={gameDetail.title}
                className="card-img-top"
              />
            ) : (
              <div className="ratio ratio-4x3 bg-light d-flex align-items-center justify-content-center">
                <span className="text-muted">Nessuna immagine</span>
              </div>
            )}
          </div>
        </div>

        {/* Colonna destra: info principali */}
        <div className="col-12 col-lg-7">
          {/* Punteggi & status */}
          <div className="d-flex flex-wrap gap-3 mb-3">
            {typeof gameDetail.metascore === "number" && (
              <div className="badge text-bg-success p-3">
                <div className="small text-uppercase">Metascore</div>
                <div className="fs-5 fw-bold">{gameDetail.metascore}</div>
              </div>
            )}
            {typeof gameDetail.userScore === "number" && (
              <div className="badge text-bg-info p-3">
                <div className="small text-uppercase">User score</div>
                <div className="fs-5 fw-bold">{gameDetail.userScore}</div>
              </div>
            )}
            {gameDetail.latestReleases && (
              <div className="badge text-bg-warning text-dark p-3">Novità</div>
            )}
          </div>
          {/* Piattaforme & modalità */}
          <div className="mb-3">
            {Array.isArray(gameDetail.platforms) &&
              gameDetail.platforms.length > 0 && (
                <div className="mb-2">
                  <span className="fw-semibold me-2">Piattaforme:</span>
                  {gameDetail.platforms.map((p) => (
                    <span key={p} className="badge text-bg-secondary me-1 mb-1">
                      {p}
                    </span>
                  ))}
                </div>
              )}
            {Array.isArray(gameDetail.modes) && gameDetail.modes.length > 0 && (
              <div>
                <span className="fw-semibold me-2">Modalità:</span>
                {gameDetail.modes.map((m) => (
                  <span key={m} className="badge text-bg-secondary me-1 mb-1">
                    {m}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Descrizione */}
          {gameDetail.description && (
            <div className="mb-3">
              <h5 className="mb-2">Descrizione</h5>
              <p className="mb-0">{gameDetail.description}</p>
            </div>
          )}
          {/* Tag */}
          {Array.isArray(gameDetail.tags) && gameDetail.tags.length > 0 && (
            <div className="mb-4">
              <span className="fw-semibold me-2">Tag:</span>
              {gameDetail.tags.map((t) => (
                <span
                  key={t}
                  className="badge rounded-pill text-bg-light border me-1 mb-1"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <div className="card-body py-3">
            <ul className="list-unstyled small mb-0">
              {gameDetail.releaseYear && (
                <li className="mb-1">
                  <strong>Uscita:</strong> {gameDetail.releaseYear}
                </li>
              )}
              {gameDetail.developer && (
                <li className="mb-1">
                  <strong>Developer:</strong> {gameDetail.developer}
                </li>
              )}
              {typeof gameDetail.pegi !== "undefined" && (
                <li className="mb-1">
                  <strong>PEGI:</strong> {gameDetail.pegi}
                </li>
              )}
            </ul>
          </div>
          <div className="pb-3">
            <h3>
              <strong>€{gameDetail.priceEUR}</strong>
            </h3>
          </div>
          {/* CTA (placeholder, collega tu la logica) */}
          <div className="d-flex flex-wrap gap-2">
            <button
              className="btn btn-dark bg-gradient rounded-4"
              onClick={handleCartList}
            >
              {!isInCart ? (
                <i
                  className="bi bi-cart fs-4 text-light"
                  onClick={handleCartList}
                ></i>
              ) : (
                <i
                  className="bi bi-cart-fill fs-4 text-light"
                  onClick={handleCartList}
                ></i>
              )}
              Acquista
            </button>

            <button
              type="button"
              className="btn btn-link p-0 border-0  m-2 heart-btn"
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
        </div>
      </div>

      {/* PORTAL MODALE ====================== */}
      {show &&
        createPortal(
          <ModalCompare
            open={show}
            onClose={() => setShow(false)}
            gameA={gameDetail}
          />,
          document.body
        )}
    </div>
  );
}
