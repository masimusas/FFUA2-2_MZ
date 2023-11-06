import React from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

// admin registracijos puslapis
const RegistrationPage = () => {
  // return, kuris grąžina registracijos puslapį su registracijos forma
  return (
    <div className="container">
      <h1>Registracijos Puslapis</h1>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
