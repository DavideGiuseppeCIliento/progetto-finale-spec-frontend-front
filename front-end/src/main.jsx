import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// IMPORT BOOTSTRAP (CSS + JS)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// FILE CSS PERSONALIZZATO
import "./assets/css/index.css";

createRoot(document.getElementById("root")).render(<App />);
