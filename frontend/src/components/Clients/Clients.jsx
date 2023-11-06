import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Clients.css";

// Komponentas, kuris atvaizduoja klientų lentelę su puslapiais
const ClientTable = () => {
  // Būsenos kintamieji
  const [clients, setClients] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const clientsPerPage = 6;

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
            <th>Laikas</th>
            <th>Trukmė</th>
            <th>Procedūra</th>
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
    </div>
  );
};

export default ClientTable;
