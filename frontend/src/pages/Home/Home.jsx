import React from "react";
import Button from "../../components/Button/Button";
import saloonImage from "../../assets/saloon.jpg";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// Pagrindinį puslapis
export const Home = () => {
  // useNavigate hook'as leidžia programiškai pereiti į kitą puslapį
  const navigate = useNavigate();
  // Patikrinama ar vartotojas autentifikuotas
  const isAuthenticated = localStorage.getItem("token");

  // Funkcija, kuri nukreipia į registracijos puslapį
  const handleRegistrationClick = () => {
    navigate("./registracija");
  };

  // Funkcija, kuri nukreipia į prisijungimo puslapį
  const handleLoginClick = () => {
    navigate("./login");
  };

  // Funkcija, kuri nukreipia į klientų puslapį
  const handleClientsClick = () => {
    navigate("/clients");
  };
  // return, kuris grąžina pagrindinį puslapį
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
      {/* Patikrinama ar vartotojas autentifikuotas */}
      {isAuthenticated && (
        /* Mygtukas, kuris nukreipia į klientų puslapį */
        <Button type="link" onClick={handleClientsClick}>
          Eiti į klientų puslapį
        </Button>
      )}
    </div>
  );
};
