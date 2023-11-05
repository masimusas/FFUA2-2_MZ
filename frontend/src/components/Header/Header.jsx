import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

// Komponentas, atvaizduojantis puslapio antraštę su navigacijos nuorodomis
export const Header = () => {
  // useNavigate hook'as leidžia programiškai pereiti į kitą puslapį
  const navigate = useNavigate();
  // Patikrinama, ar vartotojas prisijungęs, pagal tai nustatomas "isAuthenticated" kintamasis
  const isAuthenticated = localStorage.getItem("token");

  // Funkcija atsijungimui, ištrina prisijungimo duomenis ir nukreipia į prisijungimo puslapį
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // JSX, kuris atvaizduoja puslapio antraštę su navigacijos nuorodomis
  return (
    <div className="header-wrapper">
      <div className="links-assistance-wrapper">
        <div className="navlinks">
          <NavLink to="/">Home</NavLink>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/registration">Registration</NavLink>
            </>
          )}
          {isAuthenticated && <NavLink to="/clients">Clients</NavLink>}
        </div>
      </div>
    </div>
  );
};
