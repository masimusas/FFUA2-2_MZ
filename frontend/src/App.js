import "./App.css";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import ClientsPage from "./pages/Clients/Clients";
import { Home } from "./pages/Home/Home";

const App = () => {
  return (
    <div>
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
