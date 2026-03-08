import { useEffect, useState } from "react";
import axios from "axios";

export default function Commentaires() {
  const [comments, setComments] = useState([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/comments");
    setComments(res.data);

    if (res.data.length > 0) {
      const total = res.data.reduce((sum, item) => sum + item.etoiles, 0);
      setAverage((total / res.data.length).toFixed(1));
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Commentaires Clients</h2>

      <h3>Moyenne : {average} / 5 ⭐</h3>

      {comments.map((c) => (
        <div key={c.id} style={{
          border: "1px solid #ddd",
          padding: "15px",
          marginBottom: "15px",
          borderRadius: "8px"
        }}>
          <strong>{c.nom}</strong>
          <div>
            {[1,2,3,4,5].map((star) => (
              <span key={star}
                style={{ color: star <= c.etoiles ? "gold" : "gray" }}>
                ★
              </span>
            ))}
          </div>
          <p>{c.commentaire}</p>
        </div>
      ))}
    </div>
  );
}