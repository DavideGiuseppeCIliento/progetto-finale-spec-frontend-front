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
      const category = categorySelected || "";

      const params = {
        ...(search && { search }),
        ...(category && { category }),
      };

      const res = await axios.get(`${VITE_API_URL}/games`, {
        params,
      });

      const url = axios.getUri({ url: `${VITE_API_URL}/games`, params });
      console.log("URL chiamata:", url);
      setGames(res.data);

      //   console.log("Filtraggio", res.data);
    } catch (err) {
      console.error("Problema nella richiesta GET del FILTRAGGIO", err);
    }
  }

  //  --- FUNZIONE DELATE
  async function deleteGame(id) {
    try {
      setAllGames((prev) => prev.filter((g) => g.id !== id));
      setGames((prev) => prev.filter((g) => g.id !== id));
      const res = await axios.delete(`${VITE_API_URL}/games/${id}`);
    } catch (err) {
      console.error("Problema nella richiesta GET");
    }
  }

  //  --- FUNZIONE POST GAME
  async function postGame(payload) {
    try {
      const res = await axios.post(`${VITE_API_URL}/games/`, payload);

      const created = res.data?.game;
      if (!created) throw new Error("Risposta inattesa dal server");

      // aggiorno lo stato locale
      setAllGames((prev) => [...prev, created]);
      setGames((prev) => [...prev, created]);
    } catch (err) {
      console.error("POST fallita", err.response?.status, err.response?.data);
    }
  }

  //  --- FUNZIONE UPDATE GAME
  async function updateGame(id, changes) {
    try {
      const body = { ...gameDetail, ...changes };
      // opzionale: non inviare timestamp
      delete body.createdAt;
      delete body.updatedAt;

      const res = await axios.put(`${VITE_API_URL}/games/${id}`, body);
      const updated = res.data.game; // Prendi la risp per aggiornare la UI
      console.log("UPDATE - RISPOSTA: ", updated);

      setAllGames((prev) => prev.map((g) => (g.id === id ? updated : g)));
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
