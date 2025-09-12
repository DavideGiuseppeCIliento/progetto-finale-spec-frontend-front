export default function FormContact() {
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
              <form noValidate>
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
