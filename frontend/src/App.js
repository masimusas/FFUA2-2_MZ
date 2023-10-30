import "./App.css";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import ClientRegistration from "./pages/ClientRegistration/ClientRegistration";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";

const App = () => {
  // const handleButtonClick = () => {
  //   console.log("Mygtukas paspaustas!");
  // };

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clients" element={<ClientRegistration />} />
      </Routes>
    </div>
  );
};

export default App;
