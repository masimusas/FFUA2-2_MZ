import React, { useState, useEffect } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
const ClientsForm = () => {
  const [firstName, setClientsFirstName] = useState("");
  const [lastName, setClientsLastName] = useState("");
  const [email, setClientsEmail] = useState("");
  const [clientsDate, setClientsDate] = useState("");
  const [clientsTime, setClientsTime] = useState("");
  const [duration, setDuration] = useState("");
  const [procedure, setProcedure] = useState("");
  const [selectedProcedure, setSelectedProceduresList] = useState([]);

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

  useEffect(() => {
    fetch("http://localhost:5500/procedureslist")
      .then((response) => response.json())
      .then((data) => {
        console.log("Gauti procedūrų duomenys:", data);
        setSelectedProceduresList(data);
      })
      .catch((error) => {
        console.error("Klaida gaunant procedūras:", error.message);
      });
  }, []);

  const handleProcedureChange = (e) => {
    setProcedure(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        const errorData = await response.json();
        console.error("Registracijos klaida:", errorData.error);
      }
    } catch (error) {
      console.error("Registracijos klaida:", error.message);
    }
  };

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
      <br />
      <label>
        Pavardė:
        <input
          type="text"
          value={lastName}
          onChange={handleClientsLastNameChange}
          required
        />
      </label>
      <br />
      <label>
        Elektroninis paštas:
        <input
          type="email"
          value={email}
          onChange={handleClientsEmailChange}
          required
        />
      </label>
      <br />
      <label>
        Registracijos data:
        <input
          type="date"
          value={clientsDate}
          onChange={handleClientsDateChange}
          required
        />
      </label>
      <br />
      <label>
        Registracijos laikas:
        <input
          type="time"
          value={clientsTime}
          onChange={handleClientsTimeChange}
          required
        />
      </label>
      <br />
      <label>
        Trukmė iki (valandos:minutes):
        <input
          type="time"
          value={duration}
          onChange={handleDurationChange}
          required
        />
      </label>
      <br />
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
      <br />
      <button type="submit">Registruoti klientą</button>
    </form>
  );
};

export default ClientsForm;
