import { NavLink } from "react-router-dom";
export const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="links-assistance-wrapper">
        <div className="navlinks">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/registration">Registration</NavLink>

          <NavLink to="/clients">ClientsRegistration</NavLink>
        </div>
      </div>
    </div>
  );
};
