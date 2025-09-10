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
    console.log(value);
  }

  // --- FUNZIONE GESTIONE INPUT
  function handleInput(e) {
    const value = e.target.value;
    setInputValue(value);
  }

  // --- FUNZIONE GESTIONE FORM INVIO
  function handleSubmit(e) {
    e.preventDefault();
    getFilteredGames(inputValue, categorySelected);
  }

  // console.log("Categorie selezionate: ", categorySelected);
  return (
    <>
      <div className="container py-5 text-center">
        <h1>Videogames</h1>
      </div>

      {/* SEARCH + CATEGORIE */}
      <div className="container py-5">
        <form
          className="mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          style={{ maxWidth: 900 }}
        >
          {/* Input di ricerca */}
          <div className="d-flex justify-content-center">
            <input
              type="search"
              className="form-control w-100"
              placeholder="Cerca un videogioco..."
              aria-label="Search"
              value={inputValue}
              onChange={handleInput}
            />
          </div>

          {/* Checkbox categorie (sotto l'input) */}
          {categories.map((c, i) => (
            <div className="form-check form-check-inline" key={i}>
              <input
                className="form-check-input me-1"
                type="radio"
                id={i}
                name="category"
                value={c}
                checked={categorySelected === c}
                onChange={handleRadio}
              />
              <label className="form-check-label" htmlFor={c}>
                {c}
              </label>
            </div>
          ))}
        </form>
      </div>

      <div className="container">
        <div className="row">
          {games.length > 0 ? (
            games.map((g, i) => (
              <div
                key={i}
                className="col-12 col-md-6 col-lg-3 d-flex justify-content-center my-3 "
              >
                <CardGame title={g.title} category={g.category} id={g.id} />
              </div>
            ))
          ) : (
            <h1>NESSUN RISULTATO...</h1>
          )}
        </div>
      </div>
    </>
  );
}
