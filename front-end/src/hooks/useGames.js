// # IMPORT DIPENDENCES
import { useEffect, useState } from "react";
import axios from "axios";

// # IMPORT URL API
const { VITE_API_URL } = import.meta.env;

export default function useGames() {
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);

  const [gameDetail, setGameDetail] = useState(null); // Game dettaglio

  //  --- FUNZIONE GET GAMES
  async function ApiRequestGet() {
    try {
      const res = await axios.get(`${VITE_API_URL}/games`);
      setGames(res.data);
      setAllGames(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Problema nella richiesta GET");
    }
  }
  useEffect(() => {
    ApiRequestGet();
  }, []);

  // --- FUNZIONE GET DETAIL
  async function ApiRequestDetail(id) {
    try {
      const res = await axios.get(`${VITE_API_URL}/games/${id}`);
      setGameDetail(res.data.game);
    } catch (err) {
      console.error("Problema nella richiesta GET");
      setGameDetail(null);
    }
  }

  //  --- FUNZIONE GET FILTER GAMES

  async function getFilteredGames(inputValue, categorySelected) {
    try {
      const search = (inputValue || "").trim(); // stringa o ""
      const category = categorySelected || ""; // stringa o ""

      const params = {
        ...(search && { search }), // Se c'è aggiungo search
        ...(category && { category }), // Se c'è aggiungo category
      };

      const res = await axios.get(`${VITE_API_URL}/games`, {
        // Chiamata con params
        params,
      });

      setGames(res.data);

      //   console.log("Filtraggio", res.data);
    } catch (err) {
      console.error("Problema nella richiesta GET del FILTRAGGIO", err);
    }
  }

  //  --- FUNZIONE DELATE
  async function deleteGame(id) {
    try {
      const res = await axios.delete(`${VITE_API_URL}/games/${id}`); //elimino il gioco
      setAllGames((prev) => prev.filter((g) => g.id !== id)); //aggiorno UI
      setGames((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      console.error("Problema nella richiesta GET");
    }
  }

  //  --- FUNZIONE POST GAME
  async function postGame(payload) {
    try {
      const res = await axios.post(`${VITE_API_URL}/games/`, payload);

      const created = res.data.game; // Prendo la risposta per aggiornale la UI
      if (!created) throw new Error("Risposta inattesa dal server");

      // aggiorno lo stato locale e la UI
      setAllGames((prev) => [...prev, created]);
      setGames((prev) => [...prev, created]);
    } catch (err) {
      console.error("POST fallita", err.response?.status, err.response?.data);
    }
  }

  //  --- FUNZIONE UPDATE GAME
  async function updateGame(id, changes) {
    try {
      const body = { ...gameDetail, ...changes }; // Unisco i cambiamenti al dettaglio corrente
      delete body.createdAt; // Rimuovo campi gestiti dal server, per evitare conflitti
      delete body.updatedAt;

      const res = await axios.put(`${VITE_API_URL}/games/${id}`, body); //Sostituisco la risorsa lato server
      const updated = res.data.game; // Prendo la risp per aggiornare la UI
      console.log("UPDATE - RISPOSTA: ", updated);

      setAllGames((prev) => prev.map((g) => (g.id === id ? updated : g))); //Modifico UI
      setGames((prev) => prev.map((g) => (g.id === id ? updated : g)));
      setGameDetail(updated);
    } catch (err) {
      console.error("PUT fallita", err.response?.status, err.response?.data);
    }
  }

  return {
    allGames,
    games,
    gameDetail,
    getFilteredGames,
    ApiRequestDetail,
    deleteGame,
    postGame,
    updateGame,
  };
}
