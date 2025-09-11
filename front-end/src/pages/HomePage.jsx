// # IMPORT DEPENDENCES
import { useMemo } from "react";
import { NavLink } from "react-router-dom";

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
            <NavLink to="/games" className="button-hero text-decoration-none">
              Scopri di più
            </NavLink>
          </div>
        </div>
      </div>

      {/* SEZIONE INFO */}

      <div className="container p-5">
        <div className="row g-5">
          {/* col1 */}
          <div className="col ">
            <div className="info-column col1 h-100 shadow-lg ">
              <div className=" info-column-text ">
                <p className="text-warning">
                  <strong>{"Cosa ti offriamo?".toUpperCase()}</strong>
                </p>
                <h1 className="text-white pb-4">
                  {"Cloux Games".toUpperCase()}
                </h1>
                <p className="text-white">
                  Explore new worlds, epic battles, and thrilling adventures.
                  Play, compete, and experience gaming like never before.
                </p>
                <NavLink
                  to="/games"
                  className="btn btn-warning rounded-4 text-decoration-none"
                >
                  Scopri di più
                </NavLink>
              </div>
            </div>
          </div>

          {/* col2 */}
          <div className="col ">
            <div className="info-column col2 h-100">
              <div className=" info-column-text shadow-lg">
                <p className="text-warning">
                  <strong>{"Cosa ti offriamo?".toUpperCase()}</strong>
                </p>
                <h1 className="text-white pb-4">{"Forums".toUpperCase()}</h1>
                <p className="text-white">
                  Join discussions, share tips, and connect with gamers. Your
                  hub for news, strategies, and community insights.
                </p>
                <NavLink
                  to="/games"
                  className="btn btn-warning  rounded-4 text-decoration-none"
                >
                  Esplora
                </NavLink>
              </div>
            </div>
          </div>

          {/* col3 */}
          <div className="col ">
            <div className="info-column col3 h-100">
              <div className=" info-column-text shadow-lg">
                <p className="text-warning">
                  <strong>{"Cosa ti offriamo?".toUpperCase()}</strong>
                </p>
                <h1 className="text-white pb-4">
                  {"Help Center".toUpperCase()}
                </h1>
                <p className="text-white">
                  Need support? Find answers, guides, and troubleshooting tips.
                  Get help fast and keep your gaming experience smooth.
                </p>
                <NavLink
                  to="/games"
                  className="btn btn-warning rounded-4 text-decoration-none"
                >
                  Visita
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ULTIMI ARRIVI ===== */}
      <div className="container-fluid text-center pt-5 pb-3 bg-light">
        <h1>Ultimi Arrivi</h1>
      </div>

      <div className="container-fluid bg-light">
        <div className="container pb-5 bg-light">
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
      </div>

      {/* ===== SEZIONE IMMAGINE GRANDE ===== */}

      <div className="container-fluid text-center container-image-homepage">
        <div className="container-image-homepage-text">
          <h1>{"Scopri le nostre offerte!".toUpperCase()}</h1>
          <p className="pb-3">
            Non perdere tempo su altri siti e approfittane subito.
          </p>
          <NavLink to="/games" className="button-hero text-decoration-none">
            Scopri di più
          </NavLink>
        </div>
      </div>
    </>
  );
}
