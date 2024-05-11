import { FaCaretDown, FaBars, FaTimes } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import "./Navbar.scss";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
/* import {
  Navbar as MTNavbar, MobileNav, Typography, Button, IconButton,} from '@material-tailwind/react'; */


const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  
  return (
    <nav className="site-navbar ">
      <div className="nav-left">

        <button className="burger-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className={`menu-links ${menuOpen ? "open" : ""}`}>
        
          <NavLink to="/" className="brand" onClick={toggleMenu}>
          Home
        </NavLink>
          <NavLink to="/about" className="about" onClick={toggleMenu}>
          About
        </NavLink>

          {isLoggedIn && <NavLink to="/favorites" onClick={toggleMenu}><span style={{ display: 'inline-block' }}>{}Favorites</span></NavLink>}
        
        {isLoggedIn && user?.isBusiness && (
            <NavLink to="/my-cards" onClick={toggleMenu}>My Cards</NavLink>
        )}

        {isLoggedIn && user?.isBusiness && (
            <NavLink to="/create-card" onClick={toggleMenu}>Create Card</NavLink>
        )}
      </div>
      </div>


      <div className="nav-right">
        {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
        {!isLoggedIn && <NavLink to="/login">Login</NavLink>}

        <div>
          {isLoggedIn && (
            <div className="user-menu">
              <button className="user-name-button">
                {user && (
                  <span>
                    {user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)}{' '}
                    {user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)}
                  </span>
                )}
                <span>
                <FaCaretDown className="dropdown-icon" />
                </span>
              </button>
              <div className="user-menu-content">
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;




{/* {isLoggedIn && <NavLink to="/profile"> Profile</NavLink>} */ }