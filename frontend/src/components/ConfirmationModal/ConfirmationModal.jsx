// ConfirmationModal.jsx
import React from "react";
import "./ConfirmationModal.css";

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
