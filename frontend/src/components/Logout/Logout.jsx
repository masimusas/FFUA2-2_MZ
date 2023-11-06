import React from "react";

// Logout komponentas, atsakingas už atsijungimo funkcionalumą
const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    // Pašalinamas prisijungimo tokenas iš localStorage
    localStorage.removeItem("token");
    // Jei yra nurodytas onLogout prop, jis iškviečiamas
    if (onLogout) {
      onLogout();
    }
  };

  // return, kuris gražina atsijungimo mygtuką
  return <button onClick={handleLogout}>Atsijungti</button>;
};

export default Logout;
