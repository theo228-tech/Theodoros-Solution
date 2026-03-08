// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Pour navigation
import MainLayout from "../components/MainLayout"; // 🔹 On importe le layout principal
import "../pages/Dashboard.css";
import Boutique1 from "./Boutique1.jpg";
import Boutique2 from "./Boutique2.jpg";
import Boutique3 from "./Boutique3.jpg";
import Boutique4 from "./Boutique4.jpg";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  // 🔹 Hook useEffect pour récupérer les stats
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dashboard")
      .then((res) => {
        console.log("API DASHBOARD:", res.data); // Debug pour voir les données
        setStats(res.data); 
      })
      .catch((err) => console.error(err));
  }, []);

  if (!stats) return <p>Chargement...</p>;

  // 🔹 Gestion clic sur chaque bouton
  const handleClick = (section) => {
    if (section === "Produits") navigate("/produits");
    if (section === "Clients") navigate("/clients");
    if (section === "Ventes") navigate("/ventes");
    if (section === "Stock") navigate("/stock");
  };

  return (
    // 🔹 On entoure tout le dashboard avec MainLayout
    <MainLayout userName="Théo">
      <h2>Tableau de Bord</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* Bouton Produits */}
        <button
          className="card"
          onClick={() => handleClick("Produits")}
          style={cardStyle}
        >
          <h4>Produits</h4>
          <p>{stats.totalProduits}</p>
        </button>

        {/* Bouton Clients */}
        <button
          className="card"
          onClick={() => handleClick("Clients")}
          style={cardStyle}
        >
          <h4>Clients</h4>
          <p>{stats.totalClients}</p>
        </button>

        {/* Bouton Ventes */}
        <button
          className="card"
          onClick={() => handleClick("Ventes")}
          style={cardStyle}
        >
          <h4>Ventes</h4>
          <p>{stats.totalVentes}</p>
        </button>

        {/* Bouton Stock */}
        <button
          className="card"
          onClick={() => handleClick("Stock")}
          style={cardStyle}
        >
          <h4>Stock</h4>
          <p>{stats.produitsRupture}</p>
        </button>
      </div>

      <div className="images">
       <img src={Boutique1} alt="Boutique1"/>
       <img src={Boutique2} alt="Boutique2"/>
       <img src={Boutique3} alt="Boutique3"/>
       <img src={Boutique4} alt="Boutique4"/>
       
      </div>
    </MainLayout>
  );
}

// 🔹 Style commun pour tous les boutons
const cardStyle = {
  fontSize: "14px",
  padding: "1px",
  backgroundColor: "#030303d0",
  color: "white",
  borderRadius: "20px",
  cursor: "pointer",
  border: "none",
  textAlign: "center",
  boxShadow: "5px 8px 4px rgb(70, 14, 14)",
  transition: "all 0.2s ease",
};