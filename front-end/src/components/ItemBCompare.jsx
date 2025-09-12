// # IMPORT DEPENDENCES
import { useEffect } from "react";

// # IMPORT HOOKS
import useGames from "../hooks/useGames";

export default function ItemBCompare({ idB, setIdItemB, setInputValue }) {
  const { gameDetail, ApiRequestDetail } = useGames(); // Importo GAME

  useEffect(() => {
    ApiRequestDetail(idB);
  }, [idB]);

  // GESTIONE CHIUSURA ITEMB

  function handleCloseItemB() {
    setInputValue("");
    setIdItemB(null);
  }

  return (
    <>
      <div className="col-12 col-lg-5">
        {gameDetail && (
          <>
            <div className="d-flex align-items-start gap-3">
              {/* Cover */}
              <div className="ratio ratio-1x1" style={{ width: 96 }}>
                {gameDetail.image ? (
                  <img
                    src={gameDetail.image}
                    alt={gameDetail.title}
                    className="rounded object-fit-cover"
                  />
                ) : (
                  <div className="bg-light rounded" />
                )}
              </div>

              {/* Titolo + categoria */}
              <div>
                <h6 className="mb-1">{gameDetail.title}</h6>
                {gameDetail.category && (
                  <span className="badge text-bg-secondary">
                    {gameDetail.category}
                  </span>
                )}
              </div>
            </div>

            <hr />

            {/* Meta rapidi */}
            <ul className="list-unstyled small mb-0">
              {gameDetail.releaseYear && (
                <li className="mb-2">
                  <strong>Uscita:</strong> {gameDetail.releaseYear}
                </li>
              )}
              {gameDetail.developer && (
                <li className="mb-2">
                  <strong>Developer:</strong> {gameDetail.developer}
                </li>
              )}
              {(gameDetail.metascore || gameDetail.userScore) && (
                <li className="mb-2 d-flex gap-2">
                  {gameDetail.metascore && (
                    <span className="badge text-bg-success">
                      Meta {gameDetail.metascore}
                    </span>
                  )}
                  {gameDetail.userScore && (
                    <span className="badge text-bg-info">
                      User {gameDetail.userScore}
                    </span>
                  )}
                </li>
              )}
              {Array.isArray(gameDetail.platforms) &&
                gameDetail.platforms.length > 0 && (
                  <li className="mb-2">
                    <strong>Piattaforme:</strong>{" "}
                    {gameDetail.platforms.map((p, i) => (
                      <span key={i} className="badge text-bg-light border me-1">
                        {p}
                      </span>
                    ))}
                  </li>
                )}
              {typeof gameDetail.priceEUR === "number" && (
                <li className="mb-2">
                  <strong>Prezzo:</strong> €{gameDetail.priceEUR.toFixed(2)}
                </li>
              )}
              {Array.isArray(gameDetail.tags) && gameDetail.tags.length > 0 && (
                <li className="mb-2">
                  <strong>Tag:</strong>{" "}
                  {gameDetail.tags.slice(0, 6).map((t, i) => (
                    <span key={i} className="badge text-bg-light border me-1">
                      {t}
                    </span>
                  ))}
                </li>
              )}
            </ul>
          </>
        )}
        <button className="btn btn-dark mt-3" onClick={handleCloseItemB}>
          Scegli un altro gioco
        </button>
      </div>
    </>
  );
}
