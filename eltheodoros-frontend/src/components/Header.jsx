// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css"; // 🔹 Import du CSS

export default function Header({ userName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Ici tu peux clear le token ou session
    console.log("Déconnexion...");
    localStorage.removeItem("token"); // si tu stockes un token
    navigate("/login");
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle} className="logo main-logo">Theodoros <br/> Solution</div>

      <nav style={navStyle}>
        
        <Link style={linkStyle} to="/produits">Produits</Link>
        <Link style={linkStyle} to="/clients">Clients</Link>
        <Link style={linkStyle} to="/ventes">Ventes</Link>
        <Link style={linkStyle} to="/stock">Stock</Link>
      </nav>

      <div style={userStyle}>
        
        <button style={logoutBtn} onClick={handleLogout}>Déconnexion</button>
      </div>
    </header>
  );
}

// Styles inline simples

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#030303d0",
  color: "white",
  borderBottom: "3px solid rgb(179,11,11)"
};

const logoStyle = { fontWeight: "bold", fontSize: "18px" };
const navStyle = { display: "flex", gap: "15px" };
const linkStyle = { color: "white", textDecoration: "none" };
const userStyle = { display: "flex", gap: "10px", alignItems: "center" };
const logoutBtn = { padding: "4px 10px", cursor: "pointer", borderRadius: "6px" };