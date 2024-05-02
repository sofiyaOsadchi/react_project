import { FaHome } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import "./Navbar.scss";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();


  const navigate = useNavigate();
  return (
    <nav className="site-navbar">
      <div className="nav-left">
        <NavLink to="/" className="brand">
          <FaHome />
          Home
        </NavLink>
        {isLoggedIn && <NavLink to="/favorites">Favorites</NavLink>}
        {isLoggedIn && user?.isBusiness && (
          <NavLink to="/create-card">Create Card</NavLink>
        )}
        {isLoggedIn && user?.isBusiness && (
          <NavLink to="/my-cards">My Cards</NavLink>
        )}

      </div>

      <div className="nav-right">
        {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
        {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
        {isLoggedIn && (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        )}


        {/* {isLoggedIn && <NavLink to="/profile"> Profile</NavLink>} */}

        
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
