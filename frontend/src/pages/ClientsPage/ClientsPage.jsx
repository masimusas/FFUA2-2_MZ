import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClienForm from "../../components/ClientForm/ClientForm";
import Clients from "../../components/Clients/Clients";
import "./ClientsPage.css";
import Modal from "react-modal";

// Komponentas, atvaizduojantis klientų puslapį su sąrašu ir registracijos forma
const ClientsPage = () => {
  useEffect(() => {
    Modal.setAppElement("#root"); // Pakeiskite "#root" pagal savo pagrindinio elemento id
  }, []);
  // Būsenos kintamasis, nurodantis ar modalas atidarytas ar uždarytas
  const [isModalOpen, setIsModalOpen] = useState(false);
  // useNavigate hook'as leidžia programiškai pereiti į kitą puslapį
  const navigate = useNavigate();

  // useEffect hook'as vykdomas komponento pradinio užkrovimo metu
  useEffect(() => {
    // Tikrinama ar vartotojas autentifikuotas
    const token = localStorage.getItem("token");

    if (!token) {
      // Jei vartotojas neautentifikuotas, nukreipiami į prisijungimo puslapį
      navigate("/login");
    } else {
      // Jei vartotojas autentifikuotas, tikrinama ar galioja jo prisijungimo tokenas
      fetch("http://localhost:5500/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            // Jei tokenas nebevalidus, vartotojas nukreipiamas į prisijungimo puslapį
            throw new Error("Tokeno patikrinimas nepavyko");
          }
          return response.json();
        })
        .catch(() => {
          navigate("/login");
        });
    }
  }, [navigate]);

  // Funkcija, kuri atidaro modalą
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Funkcija, kuri uždaro modalą
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // return, kuris grąžina klientų puslapį
  return (
    <div className="container">
      <h1>Salono Klientų Puslapis</h1>
      <button className="modal-button" onClick={openModal}>
        Registruoti klientą
      </button>
      <Clients />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Klientų registracijos forma"
        style={{
          content: {
            maxWidth: "500px",
            maxHeight: "fit-content",
            margin: "auto",
          },
        }}
      >
        <div className="modal-title">
          <button className="modal-close-button" onClick={closeModal}>
            Uždaryti
          </button>
          <h1>Klientų registracijos forma</h1>
        </div>

        <ClienForm />
      </Modal>
    </div>
  );
};

export default ClientsPage;
