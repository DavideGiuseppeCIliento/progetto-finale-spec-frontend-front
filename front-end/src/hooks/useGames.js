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

  return { allGames, games, gameDetail, getFilteredGames, ApiRequestDetail };
}
