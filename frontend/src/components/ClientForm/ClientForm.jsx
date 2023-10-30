import React, { useState } from "react";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [registrationTime, setRegistrationTime] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRegistrationDateChange = (e) => {
    setRegistrationDate(e.target.value);
  };

  const handleRegistrationTimeChange = (e) => {
    setRegistrationTime(e.target.value);
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
          onChange={handleFirstNameChange}
          required
        />
      </label>
      <br />
      <label>
        Pavardė:
        <input
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
      </label>
      <br />
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
        Registracijos data:
        <input
          type="date"
          value={registrationDate}
          onChange={handleRegistrationDateChange}
          required
        />
      </label>
      <br />
      <label>
        Registracijos laikas:
        <input
          type="time"
          value={registrationTime}
          onChange={handleRegistrationTimeChange}
          required
        />
      </label>
      <br />
      <button type="submit">Registruoti klientą</button>
    </form>
  );
};

export default RegistrationForm;
