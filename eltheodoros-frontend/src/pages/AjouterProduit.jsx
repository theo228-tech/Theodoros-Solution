// src/pages/AjouterProduit.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../components/MainLayout";

export default function AjouterProduit() {
  const navigate = useNavigate();
  const { id } = useParams(); // récupère l'id si on modifie

  const [produit, setProduit] = useState({
    nom: "",
    prix: "",
    quantite_boutique: "",
    quantite_magasin: ""
  });

  // 🔹 Charger le produit si on est en mode modification
  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/produits/${id}`)
        .then(res => {
          setProduit(res.data);
        })
        .catch(err => {
          console.error(err);
          alert("Erreur lors du chargement du produit");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduit(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!produit.nom || !produit.prix) {
      alert("Nom et Prix requis !");
      return;
    }

    try {
      if (id) {
        // 🔹 MODE MODIFICATION
        await axios.put(`http://127.0.0.1:8000/api/produits/${id}`, produit);
        alert("Produit modifié avec succès !");
      } else {
        // 🔹 MODE AJOUT
        await axios.post("http://127.0.0.1:8000/api/produits", produit);
        alert("Produit ajouté avec succès !");
      }

      navigate("/produits");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'opération !");
    }
  };

  return (
    <MainLayout userName="Théo">
      <div style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#030303d0",
        color: "white",
        borderRadius: "10px"
      }}>
        <h2>{id ? "Modifier le Produit" : "Ajouter un Produit"}</h2>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "15px"
        }}>

          <input
            type="text"
            name="nom"
            placeholder="Nom du produit"
            value={produit.nom}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="prix"
            placeholder="Prix (FCFA)"
            value={produit.prix}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="quantite_boutique"
            placeholder="Qté Boutique"
            value={produit.quantite_boutique}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="quantite_magasin"
            placeholder="Qté Magasin"
            value={produit.quantite_magasin}
            onChange={handleChange}
            style={inputStyle}
          />

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px"
          }}>
            <button onClick={handleSubmit} style={buttonStyle}>
              {id ? "Modifier" : "Ajouter"}
            </button>

            <button
              onClick={() => navigate("/produits")}
              style={{ ...buttonStyle, backgroundColor: "#777" }}
            >
              Annuler
            </button>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

// Styles
const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#f5c542",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer"
};