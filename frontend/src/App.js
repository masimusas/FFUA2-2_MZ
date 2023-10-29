import "./App.css";
import RegistrationPage from "./pages/Registration/Registration";
import { Routes, Route } from "react-router-dom";
import Button from "./components/Button/Button";

const App = () => {
  const handleButtonClick = () => {
    // Čia galite įdėti veiksmus, kurie vykdomi paspaudus mygtuką.
    console.log("Mygtukas paspaustas!");
  };

  return (
    <div>
      <h1>Salono Puslapis</h1>
      <Button type="button" onClick={handleButtonClick}>
        Paspausk mane
      </Button>
      <br />
      <Button type="link" linkTo="/registracija">
        Eiti į registracijos puslapį
      </Button>
      {/* React Router maršrutavimas */}
      <Routes>
        <Route path="/registracija" element={<RegistrationPage />} />
      </Routes>
    </div>
  );
};

export default App;
