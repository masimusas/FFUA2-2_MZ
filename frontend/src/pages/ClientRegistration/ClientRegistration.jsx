import React, { useState } from "react";
import ClienForm from "../../components/ClientForm/ClientForm";
import Modal from "react-modal";

const RegistrationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Salono Klientų Puslapis</h1>
      <button onClick={openModal}>Registruoti klientą</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Registracijos forma"
      >
        <button onClick={closeModal}>Uždaryti</button>
        <ClienForm />
      </Modal>
    </div>
  );
};

export default RegistrationPage;
