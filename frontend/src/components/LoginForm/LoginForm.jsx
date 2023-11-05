import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Komponentas, atvaizduojantis prisijungimo formą
const LoginForm = () => {
  // useNavigate hook'as leidžia programiškai pereiti į kitą puslapį
  const navigate = useNavigate();
  // Būsenos kintamieji saugantys įvestus el. paštą ir slaptažodį
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Būsenos kintamasis klaidos pranešimui
  const [errorMessage, setErrorMessage] = useState(null);
  // Funkcija keisti el. pašto būsenos kintamąjį pagal įvestą reikšmę
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Funkcija keisti slaptažodžio būsenos kintamąjį pagal įvestą reikšmę
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Funkcija, kuri vykdoma prisijungimo formos pateikimo metu
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Siunčiama prisijungimo užklausa į serverį su įvestais duomenimis
      const response = await fetch("http://localhost:5500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Gaunami duomenys iš serverio atsakymo
      const data = await response.json();
      console.log(data);
      // Jei gaunamas prisijungimo tokenas, jis saugomas localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      navigate("/clients");
    } catch (error) {
      // Jei įvyko klaida, rodomas bendras klaidos pranešimas
      setErrorMessage(error);
    }
  };

  // JSX, kuris atvaizduoja prisijungimo formą
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Elektroninis paštas:
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <br />
      <label>
        Slaptažodis:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <br />
      <button type="submit">Prisijungti</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
};

export default LoginForm;
