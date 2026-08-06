import "../styles/Navbar2.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
const Navbar2 = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="logo">
              <img src={logo} alt="logo" />
              <h2>MirrorVibes</h2>
          </div>

      <div className="nav-links">

        <NavLink to="/home">
          Home
        </NavLink>

        <NavLink to="/journal">
          My Journal
        </NavLink>

        <NavLink to="/playlist">
          Playlist
        </NavLink>

        <NavLink to="/profile">
          Profile
        </NavLink>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar2;