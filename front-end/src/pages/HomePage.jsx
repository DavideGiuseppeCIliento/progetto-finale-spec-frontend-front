// # IMPORT DEPENDENCES
import { useEffect, useRef } from "react";
import { useState, useMemo } from "react";

// # IMPORT COMPONENTS
import CardGame from "../components/CardGame";

// #IMPORT HOOKS
import useGames from "../hooks/useGames";

export default function HomePage() {
  const { games } = useGames();

  // --- NON PUO FUNZIONARE PER VIA DEL BACKEND
  // useEffect(() => {
  //   setLatestGames(games.filter((g) => g.latestReleases === true));
  // }, []);

  const latestGames = useMemo(() => games.slice(0, 4), [games]); //calcolo ULTIMI ARRIVI FITTIZIO

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <div className="container-fluid homepage-background-hero d-flex flex-column align-items-center justify-content-center text-center">
        <div className="row homepage-text-hero ">
          <h1 className="hero-title">Vivi Sperienze Indimenticabili</h1>
          <h5>Non perderti mai i titoli più emozionanti del momento</h5>
          <div className="col-auto pt-4">
            <button className="button-hero">Scopri di più</button>
          </div>
        </div>
      </div>

      <div className="container text-center py-5">
        <h1>Ultimi Arrivi</h1>
      </div>

      {/* ===== ULTIMI ARRIVI ===== */}
      <div className="container pb-5">
        <div className="row">
          {Array.isArray(latestGames) && latestGames.length > 0 ? ( // ## USO sortedGames per avere GAME ORDINATI
            latestGames.map((g) => (
              <div
                key={g.id ?? g.title}
                className="col-12 col-md-6 col-lg-3 d-flex justify-content-center my-3"
              >
                <CardGame
                  title={g.title}
                  category={g.category}
                  id={`/games/${g.id}`}
                />
              </div>
            ))
          ) : (
            <div className="col-12 py-5 text-center text-muted">
              NESSUN RISULTATO...
            </div>
          )}
        </div>
      </div>
    </>
  );
}
