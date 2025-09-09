// # IMPORT DIPENDENCES
import axios from "axios";
import { useEffect, useState } from "react";

// # IMPORT COMPONENTS
import CardGame from "../components/CardGame";

// # IMPORT URL API
const { VITE_API_URL } = import.meta.env;

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //  --- FUNZIONE CHIAMATA API
  async function ApiRequest() {
    try {
      const res = await axios.get(`${VITE_API_URL}/games`);
      setGames(res.data);
      console.log(res.data);
    } catch (err) {}
  }

  useEffect(() => {
    ApiRequest();
  }, []);

  // --- FUNZIONE GESTIONE INPUT
  function handleInput(e) {
    const value = e.target.value;
    setInputValue(value);
  }

  // --- FUNZIONE GESTIONE FORM INVIO
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="container py-5 text-center">
        <h1>Videogames</h1>
      </div>

      <div className="container py-5 text-center">
        <form
          className="d-flex justify-content-center"
          onSubmit={handleSubmit} // evita ricarica pagina
        >
          <input
            type="search"
            className="form-control w-50"
            placeholder="Cerca un videogioco..."
            aria-label="Search"
            value={inputValue}
            onChange={handleInput}
          />
        </form>
      </div>

      <div className="container">
        <div className="row">
          {games.map((g, i) => (
            <div
              key={i}
              className="col-12 col-md-6 col-lg-3 d-flex justify-content-center my-3 "
            >
              <CardGame title={g.title} category={g.category} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
