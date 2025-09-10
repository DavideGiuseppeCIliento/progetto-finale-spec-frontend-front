// # IMPORT DIPENDENCES
import axios from "axios";
import { useEffect, useState, useMemo } from "react";

// # IMPORT COMPONENTS
import CardGame from "../components/CardGame";

// # IMPORT HOOKS
import useGames from "../hooks/useGames";

export default function GamesPage() {
  const { allGames, games, getFilteredGames } = useGames(); // GAMES PRESI DA HOOK PERSONALIZZATO
  const [inputValue, setInputValue] = useState("");
  const [categorySelected, setCategorySelected] = useState("");

  // --- CREAZIONE ARRAY CATEGORIE
  const categories = useMemo(() => {
    // USE MEMO RICALCOLA ARRAY SOLO SE CAMBIA GAMES
    const cat = Array.from(new Set(allGames.map((g) => g.category))).sort();
    return [...cat];
  }, [allGames]);

  //   --- GESTIONE OPTION CATEGORY
  function handleRadio(e) {
    const value = e.target.value;
    setCategorySelected(value);
    getFilteredGames(inputValue, value); // Metti value perché l'API deve partire subito
  }

  // --- FUNZIONE GESTIONE INPUT
  function handleInput(e) {
    const value = e.target.value;
    setInputValue(value);
    getFilteredGames(value, categorySelected); // Metti value perché l'API deve partire subito
  }

  // --- FUNZIONE GESTIONE FORM INVIO
  function handleSubmit(e) {
    e.preventDefault();
  }

  // --- RESET FORM
  function handleReset() {}

  return (
    <>
      <div className="container py-5 text-center">
        <h1>Videogames</h1>
      </div>

      <div className="container pb-5">
        <div className="row g-4">
          {/* ===== Sidebar Filtri ===== */}
          <aside className="col-12 col-lg-3">
            <div className="position-sticky" style={{ top: "6rem" }}>
              <form
                id="filters"
                onSubmit={handleSubmit}
                className="p-3 border rounded-3 bg-light"
              >
                {/* Ricerca */}
                <label htmlFor="search" className="form-label fw-semibold">
                  Cerca
                </label>
                <input
                  id="search"
                  type="search"
                  className="form-control mb-3"
                  placeholder="Cerca un videogioco..."
                  aria-label="Search"
                  value={inputValue}
                  onChange={handleInput}
                />

                {/* Categoria (radio, una sola selezionabile) */}
                <div className="mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="fw-semibold">Categoria</span>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-sm btn-outline-secondary"
                      title="Reset filtri"
                    >
                      Reset
                    </button>
                  </div>

                  {/* Opzione: tutte */}
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="cat-all"
                      name="category"
                      value=""
                      checked={categorySelected === ""}
                      onChange={handleRadio}
                    />
                    <label className="form-check-label" htmlFor="cat-all">
                      Tutte
                    </label>
                  </div>

                  {categories.map((c, i) => {
                    const id = `cat-${i}`;
                    return (
                      <div className="form-check" key={id}>
                        <input
                          className="form-check-input"
                          type="radio"
                          id={id}
                          name="category" // stesso name => selezione singola
                          value={c}
                          checked={categorySelected === c}
                          onChange={handleRadio}
                        />
                        <label className="form-check-label" htmlFor={id}>
                          {c}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </form>
            </div>
          </aside>

          {/* ===== Lista prodotti ===== */}
          <main className="col-12 col-lg-9">
            <div className="row">
              {Array.isArray(games) && games.length > 0 ? (
                games.map((g) => (
                  <div
                    key={g.id ?? g.title}
                    className="col-12 col-md-6 col-lg-4 d-flex justify-content-center my-3"
                  >
                    <CardGame title={g.title} category={g.category} id={g.id} />
                  </div>
                ))
              ) : (
                <div className="col-12 py-5 text-center text-muted">
                  NESSUN RISULTATO...
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
