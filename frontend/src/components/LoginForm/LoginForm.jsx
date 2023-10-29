// LoginForm.js
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Čia turėtume įdėti kodą, kuris išsiųs prisijungimo duomenis į serverį.
    // Axios dar nėra įdiegtas, bet galėtume pridėti vėliau.
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
    </form>
  );
};

export default LoginForm;
