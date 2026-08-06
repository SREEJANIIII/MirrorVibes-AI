import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
    <div className="logo">
        <img src={logo} alt="logo" />
        <h2>MirrorVibes</h2>
    </div>

    <button className="login-btn" onClick={() => navigate("/login")}>
        Login
    </button>

    </nav>
  );
};

export default Navbar;