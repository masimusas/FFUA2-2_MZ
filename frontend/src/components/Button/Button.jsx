// Button.jsx
import React from "react";
import "./Button.css";

// Funkcija, kuri sugeneruoja mygtuką arba nuorodą pagal perduotus savybių objekto parametrus
const Button = ({ type, onClick, children, linkTo }) => {
  // Savybės objektas, kurį panaudosime kaip argumentą mygtuko arba nuorodos sukūrimui
  const buttonProps = {
    onClick, // Mygtuko paspaudimo funkcija
  };

  // Tikriname mygtuko tipo savybę
  if (type === "link") {
    // Jei mygtukas yra nuoroda, grąžiname a elemento JSX su savybėmis
    return (
      <a href={linkTo} {...buttonProps}>
        {children} {/* Vaikinio elemento turinys (tekstas arba komponentas) */}
      </a>
    );
  }

  // Jei mygtukas yra standartinis, grąžiname button elemento JSX su savybėmis
  return (
    <button type="button" {...buttonProps}>
      {children} {/* Vaikinio elemento turinys (tekstas arba komponentas) */}
    </button>
  );
};

export default Button; // Eksportuojame sukurtą komponentą
