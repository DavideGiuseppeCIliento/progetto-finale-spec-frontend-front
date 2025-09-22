// # IMPORT DEPENDENCES
import { useState, useEffect } from "react";

// # IMPORT HOOKS
import useGames from "../../hooks/useGames";

export default function ModalUpdateGame({
  open,
  onClose,
  idGame = {},
  api, // passo l'Hook intero dal parent per condividere lo stesso stato
  categories = [
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
  ],
  platforms = ["PC", "PS5", "PS4", "Xbox Series", "Xbox One", "Switch"],
  modes = ["Singleplayer", "Multiplayer", "Co-op", "Online"],
  pegiOptions = [3, 7, 12, 16, 18],
}) {
  const { ApiRequestDetail, gameDetail, updateGame } = api; // Destrutturo l'HOOK

  // ---   RACCOLGO IL GAME
  useEffect(() => {
    ApiRequestDetail(idGame); // Carico il dettaglio
  }, [idGame]);

  if (!open) return null; //Smonto modale se non aperta

  // console.log(idGame);

  // console.log("DETTAGLIO GAME: ", gameDetail);

  // --- GESTIONE SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget); // prendo tutti i campi del form (input/select/textarea/checkbox/radio)

    // ## campi base - STRINGHE
    const title = (fd.get("title") || "").toString().trim(); // Prendo la stringa senza spazi
    const category = (fd.get("category") || "").toString();
    const developer = (fd.get("developer") || "").toString().trim();
    const releaseYear = fd.get("releaseYear");
    const metascore = fd.get("metascore");
    const userScore = fd.get("userScore");
    const pegi = fd.get("pegi");
    const priceEUR = fd.get("priceEUR");
    const description = (fd.get("description") || "").toString().trim();
    const image = (fd.get("image") || "").toString().trim();
    const trailerUrl = (fd.get("trailerUrl") || "").toString().trim();
    const slug = (fd.get("slug") || "").toString().trim();
    const latestReleases = fd.get("latestReleases") === "on"; // ON se checked

    // ## array dalle checkbox MULTIPLE
    const platforms = fd.getAll("platforms").map(String); //getAll("name") ritorna *solo* i valori dei checkbox selezionati con quel name
    const modes = fd.getAll("modes").map(String); //Converte in stringa ogni elemento. => array.map(x => String(x))

    // ## tags separati da virgole
    const rawTags = (fd.get("tags") || "").toString();
    const tags = rawTags
      .split(",") // separa su virgola
      .map((t) => t.trim()) // rimuovi spazi
      .filter(Boolean); // rimuoviamo i false, 0, -0, NaN, ""

    // ## FUNZIONE CONVERSIONE IN  numeri
    function toNum(v) {
      v === null || v === "" ? null : Number(v);
    }

    const payload = {
      title,
      category,
      platforms,
      developer,
      releaseYear: toNum(releaseYear), //uso la funzione per tradurre in numeri
      modes,
      metascore: toNum(metascore),
      userScore: toNum(userScore),
      pegi: toNum(pegi),
      priceEUR: toNum(priceEUR),
      description,
      tags,
      image,
      trailerUrl,
      slug,
      latestReleases,
    };

    try {
      await updateGame(gameDetail.id, payload); // <-- await + PUT
      alert("Gioco modificato!");
      onClose(); // chiudi la modale
    } catch (err) {
      console.error("Problema nella richiesta", err);
      alert("Errore nella modifica");
    }
  }

  // Finché non carica GAMEDETAIL
  if (!gameDetail) {
    return (
      <>
        <div className="modal-backdrop fade show" onClick={onClose} />
        <div
          className="modal fade show"
          style={{ display: "block" }}
          role="dialog"
          aria-modal="true"
          onClick={onClose}
        >
          <div
            className="modal-dialog modal-xl modal-dialog-scrollable"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifica gioco</h5>
                <button type="button" className="btn-close" onClick={onClose} />
              </div>
              <div className="modal-body">Caricamento…</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" onClick={onClose} />

      {/* Dialog */}
      <div
        className="modal fade show"
        style={{ display: "block" }}
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-xl modal-dialog-scrollable"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">Modifica gioco</h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row g-4">
                  {/* Colonna sinistra */}
                  <div className="col-12 col-lg-8">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">Titolo *</label>
                        <input
                          name="title"
                          type="text"
                          className="form-control"
                          placeholder="Elden Ring"
                          defaultValue={gameDetail.title || ""}
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label">Categoria *</label>
                        <select
                          name="category"
                          className="form-select"
                          defaultValue={gameDetail.category || ""}
                          required
                        >
                          <option value="">— Seleziona —</option>
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label">Developer</label>
                        <input
                          name="developer"
                          type="text"
                          className="form-control"
                          placeholder="FromSoftware"
                          defaultValue={gameDetail.developer || ""}
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="form-label">Anno di uscita</label>
                        <input
                          name="releaseYear"
                          type="number"
                          className="form-control"
                          placeholder="2022"
                          min="1980"
                          max="2100"
                          defaultValue={gameDetail.releaseYear ?? ""}
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="form-label">Metascore</label>
                        <input
                          name="metascore"
                          type="number"
                          className="form-control"
                          min="0"
                          max="100"
                          placeholder="96"
                          defaultValue={gameDetail.metascore ?? ""}
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="form-label">User score</label>
                        <input
                          name="userScore"
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          className="form-control"
                          placeholder="8.7"
                          defaultValue={gameDetail.userScore ?? ""}
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="form-label">PEGI</label>
                        <select
                          name="pegi"
                          className="form-select"
                          defaultValue={
                            gameDetail.pegi === 0 || gameDetail.pegi
                              ? gameDetail.pegi
                              : ""
                          }
                        >
                          <option value="">—</option>
                          {pegiOptions.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="form-label">Prezzo (€)</label>
                        <input
                          name="priceEUR"
                          type="number"
                          step="0.01"
                          min="0"
                          className="form-control"
                          placeholder="59.99"
                          defaultValue={gameDetail.priceEUR ?? ""}
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label">Descrizione</label>
                        <textarea
                          name="description"
                          rows={5}
                          className="form-control"
                          placeholder="Descrivi il gioco…"
                          defaultValue={gameDetail.description || ""}
                        />
                      </div>

                      {/* Media */}
                      <div className="col-12">
                        <label className="form-label">Immagine (URL)</label>
                        <input
                          name="image"
                          type="url"
                          className="form-control"
                          placeholder="https://…"
                          defaultValue={gameDetail.image || ""}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">
                          Trailer (YouTube URL)
                        </label>
                        <input
                          name="trailerUrl"
                          type="url"
                          className="form-control"
                          placeholder="https://www.youtube.com/watch?v=…"
                          defaultValue={gameDetail.trailerUrl || ""}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Colonna destra */}
                  <div className="col-12 col-lg-4">
                    <div className="card border-0">
                      <div className="card-body p-0">
                        {/* Platforms */}
                        <div className="mb-4">
                          <h6 className="mb-2">Piattaforme</h6>
                          <div className="d-flex flex-wrap gap-3">
                            {platforms.map((p) => {
                              const id = `upd-pl-${p}`;
                              const checked = Array.isArray(
                                gameDetail.platforms
                              )
                                ? gameDetail.platforms.includes(p)
                                : false;
                              return (
                                <div className="form-check" key={p}>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={id}
                                    name="platforms"
                                    value={p}
                                    defaultChecked={checked}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={id}
                                  >
                                    {p}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Modes */}
                        <div className="mb-4">
                          <h6 className="mb-2">Modalità</h6>
                          <div className="d-flex flex-wrap gap-3">
                            {modes.map((m) => {
                              const id = `upd-md-${m}`;
                              const checked = Array.isArray(gameDetail.modes)
                                ? gameDetail.modes.includes(m)
                                : false;
                              return (
                                <div className="form-check" key={m}>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={id}
                                    name="modes"
                                    value={m}
                                    defaultChecked={checked}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={id}
                                  >
                                    {m}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="mb-3">
                          <label className="form-label">Slug</label>
                          <input
                            name="slug"
                            type="text"
                            className="form-control"
                            placeholder="elden-ring"
                            defaultValue={gameDetail.slug || ""}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">
                            Tag (separati da virgola)
                          </label>
                          <input
                            name="tags"
                            type="text"
                            className="form-control"
                            placeholder="Open-World, Dark Fantasy, Esplorazione"
                            defaultValue={
                              Array.isArray(gameDetail.tags)
                                ? gameDetail.tags.join(", ")
                                : gameDetail.tags || ""
                            }
                          />
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="upd-latest"
                            name="latestReleases"
                            defaultChecked={!!gameDetail.latestReleases}
                          />
                          <label
                            className="form-check-label pb-5"
                            htmlFor="upd-latest"
                          >
                            Mostra tra gli ultimi arrivi
                          </label>
                        </div>

                        {/* Footer */}
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onClose}
                          >
                            Annulla
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Salva modifiche
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
