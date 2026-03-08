import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const [feedback, setFeedback] = useState({
    nom: "",
    numero: "",
    email: "",
    message: "",
  });

  const [comment, setComment] = useState({
    nom: "",
    etoiles: 0,
    commentaire: "",
  });

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/api/feedback", feedback);
    alert("Avis envoyé !");
    setFeedback({ nom: "", numero: "", email: "", message: "" });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/api/comments", comment);
    alert("Commentaire envoyé !");
    setComment({ nom: "", etoiles: 0, commentaire: "" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* SECTION 1 */}
        <div className="footer-section">
          <h3>Laissez votre avis</h3>
          <form onSubmit={handleFeedbackSubmit}>
            <input placeholder="Nom"
              value={feedback.nom}
              onChange={(e) => setFeedback({...feedback, nom: e.target.value})}
              required />
            <input placeholder="Numéro"
              value={feedback.numero}
              onChange={(e) => setFeedback({...feedback, numero: e.target.value})} />
            <input type="email" placeholder="Email"
              value={feedback.email}
              onChange={(e) => setFeedback({...feedback, email: e.target.value})}
              required />
            <textarea placeholder="Message"
              value={feedback.message}
              onChange={(e) => setFeedback({...feedback, message: e.target.value})}
              required />
            <button type="submit">Envoyer</button>
          </form>
        </div>

        {/* SECTION 2 */}
        <div className="footer-section">
          <h3>Suivez-nous</h3>
          <a href="#">Facebook</a>
          <a href="#">TikTok</a>
          <a href="#">LinkedIn</a>
          <a href="#">WhatsApp</a>
        </div>

        {/* SECTION 3 */}
        <div className="footer-section">
          <h3>Informations</h3>
          <Link to="/politique-confidentialite">
            Politique de confidentialité
          </Link>
          <Link to="/commentaires">
            Voir les commentaires
          </Link>
        </div>

        {/* SECTION 4 */}
        <div className="footer-section">
          <h3>Notez-nous</h3>
          <div className="stars">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
      type="button"
      key={star}
      onClick={() => setComment({ ...comment, etoiles: star })}
      className={`star-btn ${star <= comment.etoiles ? "active" : ""}`}
    >
      ★
    </button>
  ))}
</div>

          <form onSubmit={handleCommentSubmit}>
            <input placeholder="Nom"
              value={comment.nom}
              onChange={(e) => setComment({...comment, nom: e.target.value})}
              required />
            <textarea placeholder="Votre commentaire"
              value={comment.commentaire}
              onChange={(e) => setComment({...comment, commentaire: e.target.value})}
              required />
            <button type="submit">Envoyer</button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 El Theodoros Solutions — Tous droits réservés
      </div>
    </footer>
  );
}