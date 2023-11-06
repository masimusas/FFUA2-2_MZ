import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

// prisijungimo puslapis
const RegistrationPage = () => {
  // return, kuris grąžina prisijungimo puslapį su prisijungimo forma
  return (
    <div className="container">
      <h1>Prisijungimo Puslapis</h1>
      <LoginForm />
    </div>
  );
};

export default RegistrationPage;
