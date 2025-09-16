// # IMPORT DIPENDENCES
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

// # IMPORT CONTEXT
import { CartContext } from "../contexts/CartContext";

export default function CartPage() {
  const { cart, setCart } = useContext(CartContext);

  const hasItems = Array.isArray(cart) && cart.length > 0;

  // --- RIMPOZIONE ITEM
  function handleRemove(id) {
    setCart((prev) => prev.filter((item) => String(item.id) !== String(id)));
  }

  return (
    <div className="container py-5">
      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <h1 className="mb-0">Carrello</h1>
          <span className="badge text-bg-warning">{cart?.length ?? 0}</span>
        </div>
      </div>

      {/* Stato vuoto */}
      {!hasItems && (
        <div className="text-center text-muted py-5">
          <div className="display-6 mb-2">Il tuo Carrello è vuoto</div>
          <NavLink to="/games" className="btn btn-dark rounded-4">
            Scopri i giochi
          </NavLink>
        </div>
      )}

      {/* Tabella unica */}
      {hasItems && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Titolo</th>
                <th>Categoria</th>
                <th className="text-end">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="fw-semibold">{item.title}</td>

                  <td>
                    <span className="badge text-bg-secondary">
                      {item.category}
                    </span>
                  </td>

                  <td className="text-end">
                    <Link
                      to={`/games/${item.id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                      title="Vai al dettaglio"
                    >
                      Dettagli
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      title="Rimuovi dal carrello"
                      onClick={() => handleRemove(item.id)}
                    >
                      Rimuovi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
