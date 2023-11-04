import React, { useEffect, useState } from "react";
import "./Clients.css";

const ClientTable = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/clients")
      .then((response) => response.json())
      .then((data) => setClients(data))
      .catch((error) =>
        console.error("Klaida gaunant klientų duomenis:", error)
      );
  }, []);

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
          {clients.map((client) => (
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
    </div>
  );
};

export default ClientTable;
