// src/components/MainLayout.jsx
import React from "react";
import Header from "./Header";

export default function MainLayout({ children, userName }) {
  return (
    <div>
      <Header userName={userName} />
      <main style={{ padding: "20px" }}>
        {children} {/* Ici on injecte le contenu spécifique de chaque page */}
      </main>
    </div>
  );
}