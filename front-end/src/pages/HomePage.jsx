// # IMPORT DEPENDENCES
import { useEffect, useRef } from "react";

export default function HomePage() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorRef.current.style.left = `${e.clientX}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // ## HERO SECTION
    <>
      <div className="container-fluid homepage-background-hero d-flex flex-column align-items-center justify-content-center text-center">
        {/* Cursore personalizzato */}
        <div ref={cursorRef} className="custom-cursor"></div>

        <div className="row homepage-text-hero ">
          <h1 className="hero-title">Vivi Sperienze Indimenticabili</h1>
          <h5>Non perderti mai i titoli più emozionanti del momento</h5>
          <div className="col-auto pt-4">
            <button className="button-hero">Scopri di più</button>
          </div>
        </div>
      </div>

      <div className="container ">ciao</div>
    </>
  );
}
