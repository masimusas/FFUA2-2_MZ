import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";

// Sukuriamas šakninis ReactDOM komponentas, kuriame vykdomas aplikacijos atvaizdavimas
const root = ReactDOM.createRoot(document.getElementById("root"));
// ReactDOM komponento render funkcija, kuri atvaizduoja šakninį komponentą "App"
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
