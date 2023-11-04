import React, { useState } from "react";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5500/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName, lastName, password }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Registracijos klaida:", error.message);
    }
  };

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
    </form>
  );
};

export default RegistrationForm;
