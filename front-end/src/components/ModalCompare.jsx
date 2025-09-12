// # IMPORT DEPENDENCES
import { useState, useEffect } from "react";

// # IMPORT HOOKS
import useGames from "../hooks/useGames";

// # IMPORT COMPONENTS
import ItemBCompare from "./ItemBCompare";

// src/components/ModalCompare.jsx
export default function ModalCompare({ open, onClose, gameA }) {
  if (!open) return null;

  const { games } = useGames(); // Prendop i games dall'HOOK

  const [inputValue, setInputValue] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [idItemB, setIdItemB] = useState(null);

  useEffect(() => {
    setFilteredGames(
      games.filter((g) =>
        g.title.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className="modal fade show"
        style={{ display: "block" }}
        role="dialog"
        aria-modal="true"
        onClick={onClose} // click fuori chiude
      >
        <div
          className="modal-dialog modal-xl modal-dialog-scrollable"
          onClick={(e) => e.stopPropagation()} // evita chiusura cliccando dentro
        >
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">Confronta giochi</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            {/* Body */}
            <div className="modal-body">
              <div className="row g-4">
                {/* Colonna SINISTRA: snapshot gioco A */}
                <div className="col-12 col-lg-5">
                  {gameA && (
                    <>
                      <div className="d-flex align-items-start gap-3">
                        {/* Cover */}
                        <div className="ratio ratio-1x1" style={{ width: 96 }}>
                          {gameA.image ? (
                            <img
                              src={gameA.image}
                              alt={gameA.title}
                              className="rounded object-fit-cover"
                            />
                          ) : (
                            <div className="bg-light rounded" />
                          )}
                        </div>

                        {/* Titolo + categoria */}
                        <div>
                          <h6 className="mb-1">{gameA.title}</h6>
                          {gameA.category && (
                            <span className="badge text-bg-secondary">
                              {gameA.category}
                            </span>
                          )}
                        </div>
                      </div>

                      <hr />

                      {/* Meta rapidi */}
                      <ul className="list-unstyled small mb-0">
                        {gameA.releaseYear && (
                          <li className="mb-2">
                            <strong>Uscita:</strong> {gameA.releaseYear}
                          </li>
                        )}
                        {gameA.developer && (
                          <li className="mb-2">
                            <strong>Developer:</strong> {gameA.developer}
                          </li>
                        )}
                        {(gameA.metascore || gameA.userScore) && (
                          <li className="mb-2 d-flex gap-2">
                            {gameA.metascore && (
                              <span className="badge text-bg-success">
                                Meta {gameA.metascore}
                              </span>
                            )}
                            {gameA.userScore && (
                              <span className="badge text-bg-info">
                                User {gameA.userScore}
                              </span>
                            )}
                          </li>
                        )}
                        {Array.isArray(gameA.platforms) &&
                          gameA.platforms.length > 0 && (
                            <li className="mb-2">
                              <strong>Piattaforme:</strong>{" "}
                              {gameA.platforms.map((p, i) => (
                                <span
                                  key={i}
                                  className="badge text-bg-light border me-1"
                                >
                                  {p}
                                </span>
                              ))}
                            </li>
                          )}
                        {typeof gameA.priceEUR === "number" && (
                          <li className="mb-2">
                            <strong>Prezzo:</strong> €
                            {gameA.priceEUR.toFixed(2)}
                          </li>
                        )}
                        {Array.isArray(gameA.tags) && gameA.tags.length > 0 && (
                          <li className="mb-2">
                            <strong>Tag:</strong>{" "}
                            {gameA.tags.slice(0, 6).map((t, i) => (
                              <span
                                key={i}
                                className="badge text-bg-light border me-1"
                              >
                                {t}
                              </span>
                            ))}
                          </li>
                        )}
                      </ul>
                    </>
                  )}
                </div>

                {/* B NON SCELTO ======================= */}

                {!idItemB && (
                  <>
                    {/* Colonna DESTRA: ricerca + risultati (placeholder) */}
                    <div className="col-12 col-lg-7">
                      {/* Barra di ricerca ==============================*/}
                      <div className="input-group mb-3">
                        <span className="input-group-text">
                          <i className="bi bi-search" />
                        </span>
                        <input
                          type="search"
                          className="form-control"
                          placeholder="Cerca un gioco da confrontare…"
                          aria-label="Cerca gioco"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                      </div>

                      {/* Lista risultati (mock layout) */}
                      <div className="list-group">
                        {/* ================= FILTRAGGIO CON INPUT DEI RISULTATI! */}
                        {/* Gestisco i vari casi con "Inizia a cercare, "Nessun risultato" e Risultato esiste */}
                        {inputValue ? (
                          filteredGames.length > 0 ? (
                            filteredGames.map((g) => (
                              <div
                                key={g.id ?? g.title}
                                className="list-group-item d-flex align-items-center justify-content-between"
                              >
                                <div className="d-flex align-items-center gap-3">
                                  <div>
                                    <div className="fw-semibold">{g.title}</div>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                  <span className="badge text-bg-secondary">
                                    {g.category}
                                  </span>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => setIdItemB(g.id)} //Gestione comparsa risultato
                                  >
                                    Seleziona
                                  </button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-muted py-3">
                              Nessun risultato per{" "}
                              <strong>"{inputValue}"</strong>.
                            </div>
                          )
                        ) : (
                          <div className="text-muted py-3">
                            Inizia a cercare…
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* B SCELTO ======================= */}
                {/* Passo anche setIdItemB per chiudere l'ITEM B */}
                {idItemB && (
                  <ItemBCompare
                    idB={idItemB}
                    setIdItemB={setIdItemB}
                    setInputValue={setInputValue}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
