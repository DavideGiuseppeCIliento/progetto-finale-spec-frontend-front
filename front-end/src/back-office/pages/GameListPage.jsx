// # IMPORT DEPENDENCES
import { Link } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";

// # IMPORT HOOKS
import useGames from "../../hooks/useGames";

// # IMPORT COMPONENTS
import ModalUpdateGame from "../components/ModalUpdateGame";

export default function GameListPage() {
  const gamesApi = useGames(); // <-- unica istanza condivisa
  const { allGames, deleteGame } = gamesApi;

  const [show, setShow] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

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
  // --- MEMORIZZO GIOCO E APRO MODALE
  function openEdit(id) {
    setSelectedGame(id);
    setShow(true);
  }

  // Esistono ITEMS?
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
              {allGames.map((g, i) => (
                <tr key={g.id}>
                  <td className="fw-semibold">{g.title}</td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => openEdit(g.id)}
                    >
                      Modifica
                    </button>
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
      {/* PORTAL MODALE ====================== */}
      {show &&
        createPortal(
          <ModalUpdateGame
            open={show}
            onClose={() => setShow(false)}
            idGame={selectedGame}
            api={gamesApi}
          />,
          document.body
        )}
    </div>
  );
}
