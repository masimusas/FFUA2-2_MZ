import { NavLink, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
