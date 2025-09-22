// # IMPORT DEPENDENCES
import { useState } from "react";
import { Link } from "react-router-dom";

// # IMPORT HOOKS
import useGames from "../../hooks/useGames";

const CATEGORIES = [
  "Action",
  "Adventure",
  "RPG",
  "Shooter",
  "Platform",
  "Racing",
  "Sports",
  "Strategy",
  "Simulation",
  "Horror",
  "Puzzle",
  "Indie",
];

const PLATFORMS = ["PC", "PS5", "PS4", "Xbox Series", "Xbox One", "Switch"];
const MODES = ["Singleplayer", "Multiplayer", "Co-op", "Online"];
const PEGI = [3, 7, 12, 16, 18];

export default function NewGamePage() {
  const { postGame } = useGames(); // funzione per creare un nuovo gioco

  const [form, setForm] = useState({
    // Stato controllato del form (tutti i campi)
    title: "",
    category: "",
    platforms: [],
    developer: "",
    releaseYear: "",
    modes: [],
    metascore: "",
    userScore: "",
    pegi: "",
    priceEUR: "",
    description: "",
    tags: "",
    image: "",
    trailerUrl: "",
    slug: "",
    latestReleases: false,
  });

  // GESTIONE INPUT (text, number, select e la checkbox "latestReleases")
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && name === "latestReleases" ? checked : value,
    }));
  }

  //   GESTIONE CHECK MULTIPLE (platforms/modes): toggla il valore nell'array
  function handleMultiCheck(listName, value, checked) {
    setForm((prev) => {
      const current = Array.isArray(prev[listName]) ? prev[listName] : []; // prev[listName] verifico che sia un array se no lo setto [] ((es. "platforms" o "modes"))
      const next = checked
        ? [...new Set([...current, value])] // Se Checked === true allora aggiungi, no duplicati (...) riconvertono Set in array
        : current.filter((v) => v !== value); //Se Checked === fale rimuovi perché tolta la spunta

      return { ...prev, [listName]: next }; // Ritorno oggetto con array
    });
  }

  //   RESET FORM
  function handleReset() {
    setForm({
      title: "",
      category: "",
      platforms: [],
      developer: "",
      releaseYear: "",
      modes: [],
      metascore: "",
      userScore: "",
      pegi: "",
      priceEUR: "",
      description: "",
      tags: "",
      image: "",
      trailerUrl: "",
      slug: "",
      latestReleases: false,
    });
  }

  // GESTIONE SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();

    console.log("submit");

    const payload = {
      //## NORMALIZZAZIONE DATI
      title: form.title.trim(),
      category: form.category,
      platforms: form.platforms, // array
      developer: form.developer.trim(),
      releaseYear: form.releaseYear ? Number(form.releaseYear) : null,
      modes: form.modes, // array
      metascore: form.metascore !== "" ? Number(form.metascore) : null,
      userScore: form.userScore !== "" ? Number(form.userScore) : null,
      pegi: form.pegi !== "" ? Number(form.pegi) : null,
      priceEUR: form.priceEUR !== "" ? Number(form.priceEUR) : null,
      description: form.description.trim(),
      tags: form.tags
        ? form.tags
            .split(",")
            .map((t) => t.trim()) //Rimuovo spazi
            .filter(Boolean) // Rimuovo i falsi o gli inesistenti
        : [],
      image: form.image.trim(),
      trailerUrl: form.trailerUrl.trim(),
      slug: form.slug.trim(),
      latestReleases: !!form.latestReleases,
    };

    const created = await postGame(payload);
    alert("GIOCO CARICATO CON SUCCESSO!");
    handleReset();
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h3 mb-0">Nuovo gioco</h1>
      </div>

      <form id="new-game-form" onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* Colonna sinistra */}
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                {/* Titolo + Categoria */}
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Titolo *</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Elden Ring"
                      value={form.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">Categoria *</label>
                    <select
                      name="category"
                      className="form-select"
                      value={form.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">— Seleziona —</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">Developer</label>
                    <input
                      type="text"
                      name="developer"
                      className="form-control"
                      placeholder="FromSoftware"
                      value={form.developer}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label">Anno di uscita</label>
                    <input
                      type="number"
                      name="releaseYear"
                      className="form-control"
                      placeholder="2022"
                      value={form.releaseYear}
                      onChange={handleChange}
                      min="1980"
                      max="2100"
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label">Metascore</label>
                    <input
                      type="number"
                      name="metascore"
                      className="form-control"
                      placeholder="96"
                      value={form.metascore}
                      onChange={handleChange}
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label">User score</label>
                    <input
                      type="number"
                      step="0.1"
                      name="userScore"
                      className="form-control"
                      placeholder="8.7"
                      value={form.userScore}
                      onChange={handleChange}
                      min="0"
                      max="10"
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label">PEGI</label>
                    <select
                      name="pegi"
                      className="form-select"
                      value={form.pegi}
                      onChange={handleChange}
                    >
                      <option value="">—</option>
                      {PEGI.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label">Prezzo (€)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="priceEUR"
                      className="form-control"
                      placeholder="59.99"
                      value={form.priceEUR}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Descrizione</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows={5}
                      placeholder="Descrivi il gioco…"
                      value={form.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="card mt-4 shadow-sm">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Immagine (URL)</label>
                    <input
                      type="url"
                      name="image"
                      className="form-control"
                      placeholder="https://…"
                      value={form.image}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Trailer (YouTube URL)</label>
                    <input
                      type="url"
                      name="trailerUrl"
                      className="form-control"
                      placeholder="https://www.youtube.com/watch?v=…"
                      value={form.trailerUrl}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonna destra */}
          <div className="col-12 col-lg-4">
            {/* Platforms */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h6 className="mb-3">Piattaforme</h6>
                <div className="d-flex flex-wrap gap-3">
                  {PLATFORMS.map((p) => {
                    const id = `pl-${p}`;
                    return (
                      <div className="form-check" key={p}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={id}
                          name="platforms" // ⬅️ AGGIUNTO
                          value={p}
                          checked={(form.platforms ?? []).includes(p)}
                          onChange={(e) =>
                            handleMultiCheck(
                              "platforms", // ⬅️ usa stringa fissa
                              p,
                              e.target.checked // ⬅️ passa checked
                            )
                          }
                        />
                        <label className="form-check-label" htmlFor={id}>
                          {p}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modes */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h6 className="mb-3">Modalità</h6>
                <div className="d-flex flex-wrap gap-3">
                  {MODES.map((m) => {
                    const id = `md-${m}`;
                    return (
                      <div className="form-check" key={m}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={id}
                          name="modes"
                          value={m}
                          checked={form.modes.includes(m)}
                          onChange={(e) =>
                            handleMultiCheck("modes", m, e.target.checked)
                          } // ⬅️ terzo argomento
                        />
                        <label className="form-check-label" htmlFor={id}>
                          {m}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SEO / Meta */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Slug</label>
                  <input
                    type="text"
                    name="slug"
                    className="form-control"
                    placeholder="elden-ring"
                    value={form.slug}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Tag (separati da virgola)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    className="form-control"
                    placeholder="Open-World, Dark Fantasy, Esplorazione"
                    value={form.tags}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="latest"
                    name="latestReleases"
                    checked={form.latestReleases}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="latest">
                    Mostra tra gli ultimi arrivi
                  </label>
                </div>
              </div>
            </div>

            {/* Azioni secondarie */}
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                form="new-game-form"
                type="submit"
                className="btn btn-primary"
              >
                Salva
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
