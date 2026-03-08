// src/pages/Clients.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout"; // 🔹 Import du layout
import "./Produits.css";
export default function Clients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/clients");
      setClients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchClients(); }, []);

  const ajouterClient = async () => {
    if (!nom) return alert("Le nom est requis");
    try {
      await axios.post("http://127.0.0.1:8000/api/clients", { nom, email, telephone, adresse });
      resetForm();
      fetchClients();
    } catch (error) { alert("Erreur lors de l'ajout du client"); }
  };

  const modifierClient = async () => {
    if (!selectedClient) return;
    try {
      await axios.put(`http://127.0.0.1:8000/api/clients/${selectedClient.id}`, { nom, email, telephone, adresse });
      resetForm();
      fetchClients();
    } catch (error) { alert("Erreur lors de la modification du client"); }
  };

  const resetForm = () => {
    setNom(""); setEmail(""); setTelephone(""); setAdresse(""); setSelectedClient(null);
  };

  const supprimerClient = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try { await axios.delete(`http://127.0.0.1:8000/api/clients/${id}`); fetchClients(); }
    catch (error) { alert("Erreur lors de la suppression"); }
  };

  const selectClient = (client) => {
    setSelectedClient(client);
    setNom(client.nom);
    setEmail(client.email || "");
    setTelephone(client.telephone || "");
    setAdresse(client.adresse || "");
  };

  const filteredClients = clients.filter(c =>
    c.nom.toLowerCase().includes(search.toLowerCase()) ||
    (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
    (c.telephone && c.telephone.toLowerCase().includes(search.toLowerCase())) ||
    (c.adresse && c.adresse.toLowerCase().includes(search.toLowerCase()))
  );

  // 🔹 Tout le contenu est maintenant dans MainLayout
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
          Retour au Tableau de board
        </button>

        <h2>Espace Clients</h2>

        <input
          type="text"
          placeholder="Rechercher par nom, email, téléphone ou adresse..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: "15px", width: "90%", padding: "8px" }}
        />

        <div className="form-group">
  <input placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} />
  <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
  <input placeholder="Téléphone" value={telephone} onChange={e => setTelephone(e.target.value)} />
  <input placeholder="Adresse" value={adresse} onChange={e => setAdresse(e.target.value)} />
  
  {selectedClient ? 
    <button onClick={modifierClient}>Modifier Client</button> :
    <button onClick={ajouterClient}>Ajouter Client</button>
  }
</div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px", textAlign: "center" }} border="1">
            <thead style={{ backgroundColor: "#f0f0f0", height: "45px" }}>
              <tr>
                <th style={{ padding: "10px" }}>Nom</th>
                <th style={{ padding: "10px" }}>Email</th>
                <th style={{ padding: "10px" }}>Téléphone</th>
                <th style={{ padding: "10px" }}>Adresse</th>
                <th style={{ padding: "10px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client.id} style={{ height: "40px" }}>
                  <td style={{ padding: "8px" }}>{client.nom}</td>
                  <td style={{ padding: "8px" }}>{client.email || "-"}</td>
                  <td style={{ padding: "8px" }}>{client.telephone || "-"}</td>
                  <td style={{ padding: "8px" }}>{client.adresse || "-"}</td>
                  <td style={{ padding: "8px", gap: "50px" }}>
                    <div style={{ display: "flex", gap: "10px" }}>
    
                    <button className="btn-supprimer" onClick={() => selectClient(client)}>Modifier</button>
                    <button className="btn-supprimer" onClick={() => supprimerClient(client.id)}>Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr><td colSpan="5" style={{ padding: "10px" }}>Aucun client trouvé</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}