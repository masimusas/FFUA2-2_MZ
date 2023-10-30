import React, { useState } from "react";

const ClientsForm = () => {
  const [firstName, setClientsFirstName] = useState("");
  const [lastName, setClientsLastName] = useState("");
  const [email, setClientsEmail] = useState("");
  const [clientsDate, setClientsDate] = useState("");
  const [clientsTime, setClientsTime] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <button type="submit">Registruoti klientą</button>
    </form>
  );
};

export default ClientsForm;
