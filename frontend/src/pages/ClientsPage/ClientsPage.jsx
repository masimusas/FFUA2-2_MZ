import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClienForm from "../../components/ClientForm/ClientForm";
import Clients from "../../components/Clients/Clients";
import Logout from "../../components/Logout/Logout";
import "./ClientsPage.css";
import Modal from "react-modal";

const ClientsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      fetch("http://localhost:5500/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Tokeno patikrinimas nepavyko");
          }
          return response.json();
        })
        .catch(() => {
          navigate("/login");
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    window.location.reload();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1>Salono Klientų Puslapis</h1>
      <Logout onLogout={handleLogout} />
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
            maxHeight: "800px",
            margin: "auto",
          },
        }}
      >
        <button className="modal-close-button" onClick={closeModal}>
          Uždaryti
        </button>
        <ClienForm />
      </Modal>
    </div>
  );
};

export default ClientsPage;
