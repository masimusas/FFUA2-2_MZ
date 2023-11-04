import React from "react";
import Button from "../../components/Button/Button";
import saloonImage from "../../assets/saloon.jpg";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleRegistrationClick = () => {
    navigate("./registracija");
  };

  const handleLoginClick = () => {
    navigate("./login");
  };

  const handleClientsClick = () => {
    navigate("/clients");
  };

  return (
    <div className="home-container">
      <h2>Kur stilius pasitinka ramybę</h2>
      <img src={saloonImage} alt="Beauty Salon" className="cover-image" />
      <p>
        Sveiki atvykę į "Kur stilius pasitinka ramybę" grožio saloną! Mes
        įsipareigoję suteikti jums neįtikėtiną grožio patirtį ir pasirūpinti
        jūsų išvaizda.
      </p>
      {!isAuthenticated && (
        <>
          <Button type="link" onClick={handleRegistrationClick}>
            Eiti į registracijos puslapį
          </Button>
          <Button type="link" onClick={handleLoginClick}>
            Eiti į prisijungimo puslapį
          </Button>
        </>
      )}
      {isAuthenticated && (
        <Button type="link" onClick={handleClientsClick}>
          Eiti į klientų puslapį
        </Button>
      )}
    </div>
  );
};
