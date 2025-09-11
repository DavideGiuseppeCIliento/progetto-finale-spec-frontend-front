✨ Funzionalità dell’app

SPA per comparare videogiochi: sfoglia, cerca, filtra, ordina, visualizza dettagli e aggiungi ai preferiti (wishlist).

🧭 Navigazione & Layout

Header con NavLink (Home · Games · Popular · Preferiti) + input ricerca (placeholder).

Hero section con CTA.

Sezione informativa con card a overlay (immagine + ::after, testo sopra via z-index).

Footer responsive (link utili · social · newsletter “dummy”).

🎮 Lista Giochi (/games)

Fetch iniziale dei giochi (campi base).

Ricerca live per titolo → GET /games?search=...

Filtro categoria (radio, una sola) → GET /games?category=...

Ordinamento A→Z

per Nome o Categoria (via Intl.Collator("it", { numeric: true, sensitivity: "base" }))

UI Filtri in sidebar sticky: ricerca · categorie · select ordinamento · Reset

Card gioco: titolo · categoria · “Scopri di più” · ❤️ wishlist (basso a destra)

Stati vuoti: mostra “NESSUN RISULTATO…”

📄 Dettaglio Gioco (/games/:id)

Breadcrumb: Games / Titolo

Layout responsive

Colonna sinistra: cover · meta rapidi (uscita, developer, PEGI, prezzo) · trailer (iframe, se presente)

Colonna destra: metascore/user score · piattaforme · modalità · descrizione · tag · CTA (placeholder)

Nota: solo layout; fetch gestito in pagina tramite custom hook (get by id)

⭐ Wishlist (Preferiti)

Context: WishlistContext con wishlist + setWishlist

Persistenza: lettura iniziale da localStorage (lazy initializer) + salvataggio ad ogni cambio

Toggle in card

Cuore vuoto (bi-heart) → aggiunge { id, title, category }

Cuore pieno (bi-heart-fill) → rimuove per id

UX

previeni propagazione/navigazione dove serve (e.stopPropagation, e.preventDefault)

Animazione hover cuore: micro-scale con transition (classe .heart-btn)

🔌 Endpoints utili
GET /games # lista (solo id, createdAt, updatedAt, title, category)
GET /games?search=ring # ricerca nel title
GET /games?category=RPG # filtro per category (singola)
GET /games/1 # dettaglio (tutte le proprietà del game)
