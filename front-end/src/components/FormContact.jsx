//  # IMPORT DEPENDENCES
import { useState } from "react";

// # INITIAL DATA
const initialFormData = {
  name: "",
  mail: "",
  object: "",
  message: "",
  privacy: false,
};

const EMPTY_ERRORS = {
  name: "",
  mail: "",
  object: "",
  message: "",
  privacy: "",
};

export default function FormContact() {
  const [formValue, setFormValue] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState(EMPTY_ERRORS);

  // --- Gestione INPUT
  function handleInput(e) {
    const { name, value, type, checked } = e.target;

    setFormValue((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // --- Gestione SUBMIT
  function handleSubmit(e) {
    e.preventDefault();

    const ok = formValidation(formValue);
    if (!ok) return;

    alert("Form Inviato con successo!");
    setFormValue(initialFormData);
  }

  // --- GESTIONE ERRORI FORM
  function formValidation(formValue) {
    const errs = { ...EMPTY_ERRORS };

    const name = (formValue.name ?? "").trim();
    const mail = (formValue.mail ?? "").trim();
    const object = (formValue.object ?? "").trim();
    const message = (formValue.message ?? "").trim();

    // RegExp
    const nameRe = /^[A-Za-zÀ-ÖØ-öø-ÿ'’\s-]{3,}$/u;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    // Presenza
    if (!name) errs.name = "Il nome non è presente";
    if (!mail) errs.mail = "La mail non è presente";
    if (!object) errs.object = "L’oggetto non è presente";
    if (!message) errs.message = "Il messaggio non è presente";

    // Lunghezze minime
    if (!errs.name && name.length < 3)
      errs.name = "Il nome è troppo breve (min 3)";
    if (!errs.mail && mail.length < 3)
      errs.mail = "La mail è troppo breve (min 3)";
    if (!errs.object && object.length < 3)
      errs.object = "L’oggetto è troppo breve (min 3)";
    if (!errs.message && message.length < 3)
      errs.message = "Il messaggio è troppo breve (min 3)";

    // Pattern
    if (!errs.name && !nameRe.test(name))
      errs.name = "Nome non valido (min 3 lettere)";
    if (!errs.mail && !emailRe.test(mail))
      errs.mail = "Formato email non valido";

    setErrorMessage(errs);

    const hasErrors = Object.values(errs).some(Boolean);
    return !hasErrors;
  }

  const hasErrors = Object.values(errorMessage).some(Boolean);

  return (
    <section className="container py-5">
      <div className="row g-4">
        {/* Colonna info */}
        <div className="col-12 col-lg-5">
          <h2 className="mb-3">Contattaci</h2>
          <p className="text-muted">
            Hai domande, suggerimenti o richieste? Compila il form e ti
            risponderemo il prima possibile.
          </p>

          <div className="mt-4">
            <div className="d-flex align-items-start gap-3 mb-3">
              <i className="bi bi-geo-alt fs-4"></i>
              <div>
                <div className="fw-semibold">Sede</div>
                <div>Via Example 123, Milano</div>
              </div>
            </div>
            <div className="d-flex align-items-start gap-3 mb-3">
              <i className="bi bi-envelope fs-4"></i>
              <div>
                <div className="fw-semibold">Email</div>
                <div>support@gfy.app</div>
              </div>
            </div>
            <div className="d-flex align-items-start gap-3">
              <i className="bi bi-telephone fs-4"></i>
              <div>
                <div className="fw-semibold">Telefono</div>
                <div>+39 02 1234 5678</div>
              </div>
            </div>
          </div>
        </div>

        {/* Colonna form */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              {hasErrors && (
                <div className="card bg-danger text-white">
                  <ul>
                    {errorMessage.name && <li>{errorMessage.name}</li>}
                    {errorMessage.mail && <li>{errorMessage.mail}</li>}
                    {errorMessage.object && <li>{errorMessage.object}</li>}
                    {errorMessage.message && <li>{errorMessage.message}</li>}
                  </ul>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  {/* Nome */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="name" className="form-label">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Il tuo nome"
                      name="name"
                      value={formValue.name}
                      onChange={handleInput}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="nome@esempio.com"
                      name="mail"
                      value={formValue.mail}
                      onChange={handleInput}
                      required
                    />
                  </div>

                  {/* Oggetto */}
                  <div className="col-12">
                    <label htmlFor="subject" className="form-label">
                      Oggetto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="form-control"
                      placeholder="Come possiamo aiutarti?"
                      name="object"
                      value={formValue.object}
                      onChange={handleInput}
                      required
                    />
                  </div>

                  {/* Messaggio */}
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">
                      Messaggio
                    </label>
                    <textarea
                      id="message"
                      className="form-control"
                      rows="5"
                      placeholder="Scrivi il tuo messaggio…"
                      name="message"
                      value={formValue.message}
                      onChange={handleInput}
                      required
                    ></textarea>
                  </div>

                  {/* Privacy + invio */}
                  <div className="col-12 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mt-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="privacy"
                        name="privacy"
                        checked={formValue.privacy}
                        onChange={handleInput}
                        required
                      />
                      <label className="form-check-label" htmlFor="privacy">
                        Accetto l’informativa privacy
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-dark rounded-4 px-4"
                    >
                      Invia richiesta
                    </button>
                  </div>
                </div>
              </form>

              {/* Hint di stato (placeholder, niente logica) */}
              <div className="small text-muted mt-3">
                * Tutti i campi sono obbligatori.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
