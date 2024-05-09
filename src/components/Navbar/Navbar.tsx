import { FaHeart, FaHome } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import "./Navbar.scss";
import { useAuth } from "../../contexts/AuthContext";
import Search from "../../routes/Search";

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
        <NavLink to="/about" className="about">
          About
        </NavLink>

        {isLoggedIn && <NavLink to="/favorites"><span style={{ display: 'inline-block' }}>{/* <FaHeart /> */}Favorites</span></NavLink>}
        
        {isLoggedIn && user?.isBusiness && (
          <NavLink to="/my-cards">My Cards</NavLink>
        )}

        {isLoggedIn && user?.isBusiness && (
          <NavLink to="/create-card">Create Card</NavLink>
        )}
      </div>


      <div className="nav-right">
        {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
        {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
        {/* {isLoggedIn && (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        )} */}


        {/* {isLoggedIn && <NavLink to="/profile"> Profile</NavLink>} */}

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
