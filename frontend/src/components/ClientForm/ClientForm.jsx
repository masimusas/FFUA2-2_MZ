import React, { useState, useEffect } from "react";
import "./ClientsForm.css";

// Funkcija, kuri sugeneruoja ir valdo klientų registracijos formą
const ClientsForm = () => {
  // Būsenos kintamieji, laikantys formos įvestų duomenų busenas
  const [firstName, setClientsFirstName] = useState("");
  const [lastName, setClientsLastName] = useState("");
  const [email, setClientsEmail] = useState("");
  const [clientsDate, setClientsDate] = useState("");
  const [clientsTime, setClientsTime] = useState("");
  const [duration, setDuration] = useState("");
  const [procedure, setProcedure] = useState("");
  const [selectedProcedure, setSelectedProceduresList] = useState([]);
  const [message, setMessage] = useState(null);

  // Funkcijos, skirtos kiekvienos formos lauko pakeitimui
  const handleClientsFirstNameChange = (e) => {
    setClientsFirstName(e.target.value);
  };

  const handleClientsLastNameChange = (e) => {
    setClientsLastName(e.target.value);
  };

  const handleClientsEmailChange = (e) => {
    setClientsEmail(e.target.value);
  };

  const handleClientsDateChange = (e) => {
    setClientsDate(e.target.value);
  };

  const handleClientsTimeChange = (e) => {
    setClientsTime(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  // Efektas, kuris gauna procedūrų sąrašą iš serverio
  useEffect(() => {
    fetch("http://localhost:5500/procedureslist")
      .then((response) => response.json())
      .then((data) => {
        setSelectedProceduresList(data);
      })
      .catch((error) => {
        console.error("Klaida gaunant procedūras:", error.message);
      });
  }, []);

  // Funkcija, kuri keičia būseną, kai pasirinkta procedūra
  const handleProcedureChange = (e) => {
    setProcedure(e.target.value);
  };

  // Funkcija, kuri apdoroja formos pateikimą
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Siunčiama registracijos užklausa į serverį
      const response = await fetch("http://localhost:5500/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          date: clientsDate,
          time: clientsTime,
          duration,
          procedure,
        }),
      });

      // Tikrinama ar užklausa buvo sėkminga
      if (response.ok) {
        const data = await response.json();
        // Jei sėkminga, rodomas sėkmės pranešimas
        setMessage({ type: "success", content: data.message });
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

  // return, kuris gražina klientų registracijos formą
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Vardas:
        <input
          type="text"
          value={firstName}
          onChange={handleClientsFirstNameChange}
          required
        />
      </label>
      <label>
        Pavardė:
        <input
          type="text"
          value={lastName}
          onChange={handleClientsLastNameChange}
          required
        />
      </label>
      <label>
        Elektroninis paštas:
        <input
          type="email"
          value={email}
          onChange={handleClientsEmailChange}
          required
        />
      </label>
      <label>
        Registracijos data:
        <input
          type="date"
          value={clientsDate}
          onChange={handleClientsDateChange}
          required
        />
      </label>
      <label>
        Registracijos laikas:
        <input
          type="time"
          value={clientsTime}
          onChange={handleClientsTimeChange}
          required
        />
      </label>
      <label>
        Trukmė iki (valandos:minutes):
        <input
          type="time"
          value={duration}
          onChange={handleDurationChange}
          required
        />
      </label>
      <label>
        Pasirinkite procedūrą:
        <select value={procedure} onChange={handleProcedureChange}>
          <option value="" disabled>
            Pasirinkite procedūrą
          </option>
          {selectedProcedure.map((procedure) => (
            <option key={procedure._id} value={procedure.procedureName}>
              {procedure.procedureName}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Registruoti klientą</button>
      {message && (
        <div className={`message ${message.type}`}>{message.content}</div>
      )}
    </form>
  );
};

export default ClientsForm;
