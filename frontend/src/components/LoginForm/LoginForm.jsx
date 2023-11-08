import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Komponentas, atvaizduojantis prisijungimo formą
const LoginForm = () => {
  // Būsenos kintamasis saugantis pranešimą vartotojui
  const [message, setMessage] = useState(null);
  // useNavigate hook'as leidžia programiškai pereiti į kitą puslapį
  const navigate = useNavigate();
  // Būsenos kintamieji saugantys įvestus el. paštą ir slaptažodį
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      // Gaunami duomenys iš serverio
      const data = await response.clone().json();

      // Jei gaunamas prisijungimo tokenas, jis saugomas localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        setMessage({ type: "success", content: data.message });

        // Prisijungus nukreipia į klientų puslapį
        navigate("/clients");
      } else {
        // Jei klaida, rodomas klaidos pranešimas
        const errorData = await response.json();
        setMessage({ type: "error", content: errorData.error });
      }
    } catch (error) {
      // Jei įvyko klaida, rodomas bendras klaidos pranešimas
      setMessage({ type: "error", content: error.message });
    }
  };

  // return, kuris gražina prisijungimo formą
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
      {message && (
        // Atvaizduoja pranešimą, pagal tipą
        <div className={`message ${message.type}`}>{message.content}</div>
      )}
    </form>
  );
};

export default LoginForm;
