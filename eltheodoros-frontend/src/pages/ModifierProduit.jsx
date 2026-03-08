// src/pages/Produits.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout"; // 🔹 Import du layout

export default function Produits() {
  const [produits, setProduits] = useState([]);
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [selectedProduit, setSelectedProduit] = useState("");
  const [quantiteStock, setQuantiteStock] = useState("");
  const [typeStock, setTypeStock] = useState("boutique");
  const [typeMouvement, setTypeMouvement] = useState("entree");
  const navigate = useNavigate();

  // 🔹 Nouveaux états pour mini-tableau d'ajout
  const [showAddRow, setShowAddRow] = useState(false);
  const [newProduit, setNewProduit] = useState({
    nom: "",
    prix: "",
    quantite_boutique: "",
    quantite_magasin: ""
  });

  const fetchProduits = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/produits");
      setProduits(res.data);
      if (res.data.length > 0) setSelectedProduit(res.data[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  const ajouterProduit = async () => {
    if (!nom || !prix) return alert("Nom et prix requis");
    try {
      await axios.post("http://127.0.0.1:8000/api/produits", { nom, prix });
      setNom(""); setPrix("");
      fetchProduits();
    } catch (error) {
      console.error(error);
    }
  };

  const ajouterStock = async () => {
    if (!selectedProduit || quantiteStock <= 0) return alert("Quantité invalide");
    try {
      const url = typeMouvement === "entree" 
        ? "http://127.0.0.1:8000/api/stock/entree"
        : "http://127.0.0.1:8000/api/stock/sortie";

      await axios.post(url, {
        produit_id: selectedProduit,
        quantite: Number(quantiteStock),
        type: typeStock
      });

      setQuantiteStock("");
      fetchProduits();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error(error);
        alert("Une erreur est survenue lors de l'ajout du stock.");
      }
    }
  };

  const supprimerProduit = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/produits/${id}`);
      fetchProduits();
    } catch (error) {
      console.error(error);
    }
  };

  const totalGeneral = produits.reduce((acc, p) => acc + (p.quantite_totale || 0) * p.prix, 0);

  // 🔹 Styles internes
  const inputStyle = {
    width: "100%",
    padding: "6px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    textAlign: "center"
  };

  const thStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center"
  };

  return (
    <MainLayout userName="Théo">
      <div>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "8px 14px",
            marginBottom: "20px",
            backgroundColor: "#37474f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ⬅ Retour au Dashboard
        </button>

        <h2>Espace Produits</h2>

        {/* Ajouter produit simple */}
        <div style={{ marginBottom: "20px" }}>
          <input placeholder="Nom produit" value={nom} onChange={e => setNom(e.target.value)} />
          <input placeholder="Prix" type="number" value={prix} onChange={e => setPrix(e.target.value)} />
          <button onClick={ajouterProduit}>Ajouter Produit</button>
        </div>

        {/* Ajouter stock */}
        <div style={{ marginBottom: "20px" }}>
          <select value={selectedProduit} onChange={e => setSelectedProduit(e.target.value)}>
            {produits.map(p => <option key={p.id} value={p.id}>{p.nom}</option>)}
          </select>

          <input type="number" placeholder="Quantité" value={quantiteStock} onChange={e => setQuantiteStock(e.target.value)} />

          <select value={typeStock} onChange={e => setTypeStock(e.target.value)}>
            <option value="boutique">Boutique</option>
            <option value="magasin">Magasin</option>
          </select>

          <select value={typeMouvement} onChange={e => setTypeMouvement(e.target.value)}>
            <option value="entree">Entrée</option>
            <option value="sortie">Sortie</option>
          </select>

          <button onClick={ajouterStock}>Valider</button>
        </div>

        {/* Tableau principal */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px", textAlign: "center" }}
            border="1"
          >
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0", height: "45px" }}>
                <th style={thStyle}>Produit</th>
                <th style={thStyle}>Prix</th>
                <th style={thStyle}>Boutique</th>
                <th style={thStyle}>Magasin</th>
                <th style={thStyle}>Total Qté</th>
                <th style={thStyle}>Total (FCFA)</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {produits.map(p => (
                <tr key={p.id} style={{ height: "40px" }}>
                  <td style={{ padding: "8px" }}>{p.nom}</td>
                  <td style={{ padding: "8px" }}>{p.prix}</td>
                  <td style={{ padding: "8px" }}>{p.quantite_boutique || 0}</td>
                  <td style={{ padding: "8px" }}>{p.quantite_magasin || 0}</td>
                  <td style={{ padding: "8px" }}>{p.quantite_totale || 0}</td>
                  <td style={{ padding: "8px" }}>{(p.quantite_totale || 0) * p.prix}</td>
                  <td style={{ padding: "8px" }}>
                    <button onClick={() => supprimerProduit(p.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bouton + et mini-tableau d'ajout */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            onClick={() => setShowAddRow(!showAddRow)}
            style={{
              fontSize: "22px",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: "#f5c542",
              border: "none",
              fontWeight: "bold",
              color: "#000"
            }}
          >
            + Ajouter un produit
          </button>
        </div>

        {showAddRow && (
          <div style={{ overflowX: "auto", marginTop: "15px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px", textAlign: "center" }} border="1">
              <thead>
                <tr style={{ backgroundColor: "#030303d0", color: "white", height: "45px" }}>
                  <th style={thStyle}>Nom du produit</th>
                  <th style={thStyle}>Prix</th>
                  <th style={thStyle}>Qté Boutique</th>
                  <th style={thStyle}>Qté Magasin</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="Ex: Chaise"
                      value={newProduit.nom}
                      onChange={e => setNewProduit({ ...newProduit, nom: e.target.value })}
                      style={inputStyle}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Ex: 500"
                      value={newProduit.prix}
                      onChange={e => setNewProduit({ ...newProduit, prix: e.target.value })}
                      style={inputStyle}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Ex: 10"
                      value={newProduit.quantite_boutique}
                      onChange={e => setNewProduit({ ...newProduit, quantite_boutique: e.target.value })}
                      style={inputStyle}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Ex: 5"
                      value={newProduit.quantite_magasin}
                      onChange={e => setNewProduit({ ...newProduit, quantite_magasin: e.target.value })}
                      style={inputStyle}
                    />
                  </td>
                  <td>
                    <button
                      onClick={async () => {
                        if (!newProduit.nom || !newProduit.prix) return alert("Nom et prix requis");
                        try {
                          await axios.post("http://127.0.0.1:8000/api/produits", newProduit);
                          setNewProduit({ nom: "", prix: "", quantite_boutique: "", quantite_magasin: "" });
                          setShowAddRow(false);
                          fetchProduits();
                        } catch (err) {
                          console.error(err);
                          alert("Erreur lors de l'ajout !");
                        }
                      }}
                      style={{
                        padding: "5px 12px",
                        backgroundColor: "#f5c542",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold"
                      }}
                    >
                      Ajouter
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <h3 style={{ marginTop: "20px" }}>Total Général : {totalGeneral}</h3>
      </div>
    </MainLayout>
  );
}