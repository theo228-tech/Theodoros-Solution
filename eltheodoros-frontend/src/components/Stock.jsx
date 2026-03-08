// src/pages/Stock.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // 🔹 Import du Header

export default function Stock() {
  const [stock, setStock] = useState([]);
  const navigate = useNavigate();

  const fetchStock = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/stock");
      setStock(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchStock(); }, []);

  // 🔹 Regrouper le stock par produit
  const stockParProduit = stock.reduce((acc, item) => {
    const produitId = item.produit?.id;
    if (!produitId) return acc;

    if (!acc[produitId]) {
      acc[produitId] = {
        nom: item.produit.nom,
        prix: Number(item.produit.prix || 0),
        quantite: 0,
      };
    }

    acc[produitId].quantite +=
      (item.quantite_entree || 0) - (item.quantite_sortie || 0);

    return acc;
  }, {});

  const stockFinal = Object.values(stockParProduit);

  const valeurTotale = stockFinal.reduce(
    (total, p) => total + p.quantite * p.prix,
    0
  );

  const stockRestantTotal = stockFinal.reduce((total, p) => total + p.quantite, 0);

  const getStatusColor = (qte) => {
    if (qte <= 5) return "#ff4d4d";
    if (qte <= 10) return "#ffa500";
    return "#4CAF50";
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* 🔹 Header commun */}
      <Header />

      <div style={{ padding: "30px" }}>
        {/* 🔹 Boutons retour et diagramme */}
        <div style={{ display: "flex", gap: "15px", marginBottom: "25px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 16px",
              backgroundColor: "#37474f",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Retour au Dashboard
          </button>

          <button
            onClick={() => navigate("/stock-dashboard")}
            style={{
              padding: "10px 16px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
             Voir Diagramme de Stock
          </button>
        </div>

        <h2 style={{ marginBottom: "15px" }}> Gestion du Stock</h2>
        <h3 style={{ marginBottom: "25px" }}>
           Valeur totale du stock : {valeurTotale.toFixed(2)} FCFA
        </h3>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 10px",
              textAlign: "center",
            }}
          >
            <thead style={{ backgroundColor: "#f2f2f2", height: "50px" }}>
              <tr>
                <th style={{ padding: "12px 10px" }}>Produit</th>
                <th style={{ padding: "12px 10px" }}>Quantité</th>
                <th style={{ padding: "12px 10px" }}>Prix Achat</th>
                <th style={{ padding: "12px 10px" }}>Valeur</th>
                <th style={{ padding: "12px 10px" }}>Statut</th>
              </tr>
            </thead>

            <tbody>
              {stockFinal.map((item, index) => {
                const valeur = item.quantite * item.prix;

                return (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: "#ffffff",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                      height: "45px",
                    }}
                  >
                    <td style={{ padding: "8px 10px" }}>{item.nom}</td>
                    <td style={{ padding: "8px 10px" }}>{item.quantite}</td>
                    <td style={{ padding: "8px 10px" }}>{item.prix.toFixed(2)} €</td>
                    <td style={{ padding: "8px 10px" }}>{valeur.toFixed(2)} €</td>
                    <td style={{ padding: "8px 10px" }}>
                      <span
                        style={{
                          backgroundColor: getStatusColor(item.quantite),
                          padding: "5px 12px",
                          borderRadius: "6px",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {item.quantite <= 5
                          ? "Rupture"
                          : item.quantite <= 10
                          ? "Faible"
                          : "Disponible"}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {stockFinal.length > 0 && (
                <tr
                  style={{
                    backgroundColor: "#e0e0e0",
                    fontWeight: "bold",
                    height: "45px",
                  }}
                >
                  <td>Total</td>
                  <td>{stockRestantTotal}</td>
                  <td colSpan="3"></td>
                </tr>
              )}

              {stockFinal.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: "15px" }}>
                    Aucun produit en stock
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}