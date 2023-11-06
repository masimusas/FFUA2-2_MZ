import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import "./Clients.css";

// Komponentas, kuris atvaizduoja klientų lentelę su puslapiais
const ClientTable = () => {
  // Būsenos kintamieji
  const [clients, setClients] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const clientsPerPage = 6;
  const [clientIdToDelete, setClientIdToDelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Efektas, gaunantis klientų duomenis iš serverio
  useEffect(() => {
    fetch("http://localhost:5500/clients")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) =>
        console.error("Klaida gaunant klientų duomenis:", error)
      );
  }, []);

  // Skaičiavimai puslapiavimui
  const pagesVisited = pageNumber * clientsPerPage;
  const pageCount = Math.ceil(clients.length / clientsPerPage);

  // Funkcija, kuri keičia aktyvų puslapio numerį
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  // Funkcija, kuri ištrina registraciją
  const handleDelete = async (clientId) => {
    // Išsaugome kliento ID, kurį ruošiamės ištrinti
    setClientIdToDelete(clientId);
    // Atvaizduojame patvirtinimo žinutę
    setShowConfirmation(true);
  };
  // Funkcija patvirtinimo žinutėje, kai spaudžiama "Taip"
  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Nėra autentifikacijos tokeno");
        return;
      }

      const response = await fetch(
        `http://localhost:5500/delete/${clientIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Priddame autentifikacijos tokeną į užklausos antraštę
          },
        }
      );

      if (response.ok) {
        // Jei sėkmingai ištrinta, atnaujiname klientų sąrašą
        const updatedClients = clients.filter(
          (client) => client._id !== clientIdToDelete
        );
        setClients(updatedClients);
      } else {
        const errorData = await response.json();
        console.error("Klaida trinant klientą:", errorData.error);
      }
      // Pasliapiame patvirtinimo žinutę
      setShowConfirmation(false);
    } catch (error) {
      console.error("Klaida trinant klientą:", error.message);
    }
  };
  // Funkcija patvirtinimo žinutėje, kai spaudžiama "Ne"
  const handleCancelDelete = () => {
    // Pasliapiame patvirtinimo žinutę
    setShowConfirmation(false);
  };
  // return, kuris grąžinama klientų registracijos lentelę
  return (
    <div className="clients-table">
      <h2>Klientų lentelė</h2>
      <table>
        <thead>
          <tr>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>El. paštas</th>
            <th>Data</th>
            <th>Laikas nuo</th>
            <th>Laikas iki</th>
            <th>Procedūra</th>
            <th>Ištrinti</th>
          </tr>
        </thead>
        <tbody>
          {clients
            .slice(pagesVisited, pagesVisited + clientsPerPage)
            .map((client) => (
              <tr key={client._id}>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.email}</td>
                <td>{client.date}</td>
                <td>{client.time}</td>
                <td>{client.duration}</td>
                <td>{client.procedure}</td>
                <td>
                  <button
                    className="delete-item"
                    onClick={() => handleDelete(client._id)}
                  >
                    Ištrinti
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Ankstesnis"}
        nextLabel={"Kitas"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      {/* ConfirmationModal */}
      <ConfirmationModal
        show={showConfirmation}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ClientTable;
