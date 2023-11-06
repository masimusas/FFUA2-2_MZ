import React from "react";
import "./ConfirmationModal.css";

/**
 * Komponentas, kuris atvaizduoja patvirtinimo modalą.
 * @param {boolean} show - Ar modalas turi būti rodomas.
 * @param {Function} onConfirm - Funkcija, kuri vykdoma paspaudus "Taip".
 * @param {Function} onCancel - Funkcija, kuri vykdoma paspaudus "Ne".
 */

const ConfirmationModal = ({ show, onConfirm, onCancel }) => {
  return (
    <div className={`confirmation-modal ${show ? "show" : ""}`}>
      <p>Ar tikrai norite ištrinti įrašą?</p>
      <button onClick={onConfirm}>Taip</button>
      <button onClick={onCancel}>Ne</button>
    </div>
  );
};

export default ConfirmationModal;
