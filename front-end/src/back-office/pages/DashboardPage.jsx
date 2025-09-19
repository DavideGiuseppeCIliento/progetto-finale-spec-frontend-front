// src/back-office/pages/DashboardPage.jsx
import { Link } from "react-router-dom";
import useGames from "../../hooks/useGames";

export default function DashboardPage() {
  const { allGames } = useGames();
  const count = Array.isArray(allGames) ? allGames.length : 0;

  // prendiamo i primi 5 (o gli ultimi, se preferisci inverti con .slice(-5).reverse())
  const preview = (allGames ?? []).slice(0, 5);

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="h3 mb-1">Benvenuto nella Dashboard di Game 4 You</h1>
          <p className="text-muted mb-0">
            Visualizza, modifica o carica i tuoi prodotti.
          </p>
        </div>

        <div className="d-flex gap-2">
          <Link to="/admin/productsList" className="btn btn-outline-secondary">
            Vai alla lista
          </Link>
          <Link to="/admin/newGame" className="btn btn-primary">
            + Nuovo gioco
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <div className="text-muted small">Prodotti totali</div>
                <div className="display-6 fw-bold">{count}</div>
              </div>
              <i className="bi bi-controller fs-1 text-primary" />
            </div>
            <div className="card-footer bg-transparent">
              <Link
                to="/admin/productsList"
                className="small text-decoration-none"
              >
                Gestisci prodotti →
              </Link>
            </div>
          </div>
        </div>

        {/* Altre card (placeholder) se vuoi aggiungere metriche future */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <div className="text-muted small">Ultimi arrivi (flag)</div>
                <div className="h3 mb-0">
                  {(allGames ?? []).filter((g) => g.latestReleases).length}
                </div>
              </div>
              <i className="bi bi-stars fs-1 text-warning" />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <div className="text-muted small">Categorie</div>
                <div className="h3 mb-0">
                  {new Set((allGames ?? []).map((g) => g.category)).size}
                </div>
              </div>
              <i className="bi bi-tags fs-1 text-success" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
