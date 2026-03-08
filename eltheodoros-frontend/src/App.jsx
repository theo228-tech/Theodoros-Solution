import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Produits from "./components/Produits";
import Clients from "./components/Clients";
import Ventes from "./components/Ventes"
import Stock from "./components/Stock";
import StockDashboard from "./components/StockDashboard";
import Commentaires from "./pages/Commentaires";
import Politique from "./pages/Politique";
import Footer from "./components/Footer";
import AjouterProduit from "./pages/AjouterProduit";

function App() {
  return (
    <Router>
      <Routes>
        {/* PAGE D'ACCUEIL */}
        <Route path="/" element={<Home />} />
        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/ventes" element={<Ventes />} />
        <Route path="/stock" element={<Stock />} />
       <Route path="/stock-dashboard" element={<StockDashboard />} />
       <Route path="/commentaires" element={<Commentaires />} />
       <Route path="/politique-confidentialite" element={<Politique />} />
       <Route path="/ajouter-produit" element={<AjouterProduit />} />
       <Route path="/modifier-produit/:id" element={<AjouterProduit />} />
      </Routes>
       <Footer />
    </Router>
    
  );
}

export default App;