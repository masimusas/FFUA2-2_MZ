import "./App.css";
import Registration from "./pages/RegistrationPage/RegistrationPage";
import Login from "./pages/LoginPage/LoginPage";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import ClientsPage from "./pages/ClientsPage/ClientsPage";
import { Home } from "./pages/Home/Home";

// Pagrindinė aplikacijos Funkcija, kuri grąžina navigaciją ir puslapius
const App = () => {
  // return, kuris grąžina pagrindinį aplikacijos komponentą
  return (
    <div className="background">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clients" element={<ClientsPage />} />
      </Routes>
    </div>
  );
};

export default App;
