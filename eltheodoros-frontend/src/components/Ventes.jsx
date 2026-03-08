import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout"; // 🔹 header commun

export default function Ventes() {
  const [ventes, setVentes] = useState([]);
  const [clients, setClients] = useState([]);
  const [produits, setProduits] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProduit, setSelectedProduit] = useState("");
  const [quantite, setQuantite] = useState("");
  const [typeStock, setTypeStock] = useState("boutique");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const clientsRes = await axios.get("http://127.0.0.1:8000/api/clients");
      const produitsRes = await axios.get("http://127.0.0.1:8000/api/produits");
      const ventesRes = await axios.get("http://127.0.0.1:8000/api/ventes");

      setClients(clientsRes.data);
      setProduits(produitsRes.data);
      setVentes(ventesRes.data);

      if (produitsRes.data.length > 0) setSelectedProduit(produitsRes.data[0].id);
      if (clientsRes.data.length > 0) setSelectedClient(clientsRes.data[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const ajouterVente = async () => {
    if (!selectedProduit || !selectedClient || quantite <= 0) return alert("Informations invalides");

    try {
      await axios.post("http://127.0.0.1:8000/api/ventes", {
        produit_id: selectedProduit,
        client_id: selectedClient,
        quantite: Number(quantite),
        type: typeStock
      });

      setQuantite("");
      fetchData();
      alert("Vente enregistrée avec succès");
    } catch (error) {
      alert(error.response?.data?.message || "Erreur lors de l'enregistrement de la vente");
    }
  };

  const supprimerVente = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/ventes/${id}`);
      fetchData();
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  const thStyle = { padding: "12px 15px", fontSize: "14px", fontWeight: "600", color: "#555", borderBottom: "2px solid #eee" };
  const tdStyle = { padding: "15px", fontSize: "14px" };

  return (
    <MainLayout userName="Théo">
      {/* 🔹 Boutons retour */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "8px 14px",
            backgroundColor: "#37474f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Retour au tableau de bord
        </button>
      </div>

      <h2 style={{ marginBottom: "20px" }}>Espace Ventes</h2>

      {/* Formulaire */}
      <div className="form-group" style={{ marginBottom: "30px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} style={{ padding: "8px" }}>
          {clients.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
        </select>

        <select value={selectedProduit} onChange={e => setSelectedProduit(e.target.value)} style={{ padding: "8px" }}>
          {produits.map(p => <option key={p.id} value={p.id}>{p.nom}</option>)}
        </select>

        <input type="number" placeholder="Quantité" value={quantite} onChange={e => setQuantite(e.target.value)} style={{ padding: "8px", width: "120px" }} />

        <select value={typeStock} onChange={e => setTypeStock(e.target.value)} style={{ padding: "8px" }}>
          <option value="boutique">Boutique</option>
          <option value="magasin">Magasin</option>
        </select>

        <button onClick={ajouterVente} style={{ padding: "8px 15px", backgroundColor: "#1976d2", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Valider la vente
        </button>
      </div>

      {/* Tableau */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 12px", minWidth: "900px" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th style={thStyle}>Produit</th>
              <th style={thStyle}>Client</th>
              <th style={thStyle}>Quantité</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ventes.map(v => (
              <tr key={v.id} style={{ backgroundColor: "#ffffff", boxShadow: "0 3px 10px rgba(0,0,0,0.06)" }}>
                <td style={tdStyle}>{v.produit_nom}</td>
                <td style={tdStyle}>{v.client_nom}</td>
                <td style={tdStyle}>{v.quantite}</td>
                <td style={tdStyle}>{v.total} FCFA</td>
                <td style={{ ...tdStyle, fontWeight: "bold", color: v.type === "boutique" ? "#2e7d32" : "#1565c0" }}>{v.type}</td>
                <td style={tdStyle}>{v.date_vente}</td>
                <td style={tdStyle}>
                  <button onClick={() => supprimerVente(v.id)} style={{ padding: "6px 12px", backgroundColor: "#d32f2f", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>Supprimer</button>
                </td>
              </tr>
            ))}
            {ventes.length === 0 && <tr><td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>Aucune vente enregistrée</td></tr>}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}