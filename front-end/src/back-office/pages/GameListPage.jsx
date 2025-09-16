// # IMPORT DEPENDENCES
import { Link } from "react-router-dom";

// # IMPORT HOOKS
import useGames from "../../hooks/useGames";

export default function GameListPage() {
  const { allGames, deleteGame } = useGames();

  // --- GESTIONE REMOVE
  async function handleRemove(id, title) {
    const ok = window.confirm(`Rimuovere definitivamente "${title}"?`);
    if (!ok) return;
    try {
      await deleteGame(id);
    } catch {
      alert("Non è stato possibile rimuovere il gioco.");
    }
  }

  const hasItems = Array.isArray(allGames) && allGames.length > 0;

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h3 mb-0">Lista Giochi</h1>
        <Link to="../newGame" className="btn btn-primary">
          + Nuovo gioco
        </Link>
      </div>

      {!hasItems ? (
        <div className="alert alert-light border text-muted">
          Nessun gioco presente.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Titolo</th>
                <th className="text-end">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {allGames.map((g) => (
                <tr key={g.id ?? g.title}>
                  <td className="fw-semibold">{g.title}</td>
                  <td className="text-end">
                    {/* Link relativo: risolve in /admin/productsList/edit/:id */}
                    <Link
                      to={`edit/${g.id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      Modifica
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemove(g.id, g.title)}
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
