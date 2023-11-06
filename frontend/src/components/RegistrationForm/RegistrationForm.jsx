import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// funkcija registracijos formai
const RegistrationForm = () => {
  // Būsenos kintamieji saugantys įvestus registracijos duomenis
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  // Būsenos kintamasis pranešimui vartotojui
  const [message, setMessage] = useState(null);
  // useNavigate hook'as leidžia programiškai pereiti į kitą puslapį
  const navigate = useNavigate();

  // Funkcija keisti el. pašto būsenos kintamąjį pagal įvestą reikšmę
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Funkcija keisti vardo būsenos kintamąjį pagal įvestą reikšmę
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  // Funkcija keisti pavardės būsenos kintamąjį pagal įvestą reikšmę
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  // Funkcija keisti slaptažodžio būsenos kintamąjį pagal įvestą reikšmę
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Funkcija, kuri vykdoma registracijos formos pateikimo metu
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Siunčiama registracijos užklausa į serverį su įvestais duomenimis
      const response = await fetch(`http://localhost:5500/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName, lastName, password }),
      });
      // Gaunami duomenys iš serverio
      const data = await response.clone().json();
      console.log(data.message);

      // Tikrinama ar registracija buvo sėkminga
      if (response.ok) {
        // Nukreipiama į prisijungimo puslapį po sėkmingos registracijos
        navigate("/login");
      } else {
        // Jei klaida, rodomas klaidos pranešimas
        const errorData = await response.json();
        setMessage({ type: "error", content: errorData.error });
      }
    } catch (error) {
      console.error("Registracijos klaida:", error.message);

      // Jei įvyko klaida, rodomas klaidos pranešimas
      setMessage({ type: "error", content: error.message });
    }
  };
  // return, kuris grąžina registracijos formą
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
      <label>
        Vardas:
        <input
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />
      </label>
      <label>
        Pavardė:
        <input
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
      </label>
      <label>
        Slaptažodis:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <button type="submit">Registruotis</button>
      {message && (
        <div className={`message ${message.type}`}>{message.content}</div>
      )}
    </form>
  );
};

export default RegistrationForm;
