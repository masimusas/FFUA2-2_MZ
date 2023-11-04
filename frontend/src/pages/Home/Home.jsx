import React from "react";
import Button from "../../components/Button/Button";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home-container">
      <img src="" alt="Beauty Salon" className="cover-image" />
      <h1>La Bellezza Salonas</h1>
      <p>
        Sveiki atvykę į La Bellezza grožio saloną! Mes įsipareigoję suteikti
        jums neįtikėtiną grožio patirtį ir pasirūpinti jūsų išvaizda.
      </p>
      <Button type="link" linkTo="./registracija">
        Eiti į registracijos puslapį
      </Button>
      <Button type="link" linkTo="./login">
        Eiti į prisijungimo puslapį
      </Button>
    </div>
  );
};
