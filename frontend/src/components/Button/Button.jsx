// Button.jsx
import React from "react";
import "./Button.css";

// Funkcija, kuri sugeneruoja mygtuką arba nuorodą pagal perduotus savybių objekto parametrus
const Button = ({ type, onClick, children, linkTo }) => {
  // Savybės objektas, kurį panaudosime kaip argumentą mygtuko arba nuorodos sukūrimui
  const buttonProps = {
    onClick, // Mygtuko paspaudimo funkcija
  };

  // Tikriname mygtuko tipą
  if (type === "link") {
    // return, kuris grąžina linką
    return (
      <a href={linkTo} {...buttonProps}>
        {children} {/* Vaikinio elemento turinys (tekstas arba komponentas) */}
      </a>
    );
  }

  // return, kuris grąžina button
  return (
    <button type="button" {...buttonProps}>
      {children} {/* Vaikinio elemento turinys (tekstas arba komponentas) */}
    </button>
  );
};

export default Button;
