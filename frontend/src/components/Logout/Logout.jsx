import React from "react";

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) {
      onLogout();
    }
  };

  return <button onClick={handleLogout}>Atsijungti</button>;
};

export default Logout;
