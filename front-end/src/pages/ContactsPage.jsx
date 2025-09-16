// # IMPORT COMPONENTS
import FormContact from "../components/FormContact";

export default function ContactsPage() {
  return (
    <main>
      <div className="container pt-5 text-center">
        <h1>Contatti</h1>
        <p>
          Hai bisogno di assistenza? Non perdere tempo ed usa unp dei nostri
          recapiti!
        </p>
      </div>

      <div className="container">
        <div className="container pb-5 ">
          <div className="row">
            <FormContact />
          </div>
        </div>
      </div>
    </main>
  );
}
