import React, { useEffect } from "react";
import "./Home.css";

export default function Home() {

  // Simple effet fade-in au scroll
  useEffect(() => {
    const faders = document.querySelectorAll(".fade-in");
    const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));
  }, []);

  return (
    <div className="home-container">
      {/* HEADER */}
      <header className="home-header">
        <div className="logo">El Theodoros</div>
        <nav className="nav-links">
          <a href="#services">Services</a>
          <a href="#about">À propos</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="btn-primary">Se connecter</button>
      </header>

      {/* MAIN */}
      <main className="home-main">
        {/* Hero Section */}
        <section className="hero-section fade-in">
          <div className="hero-text">
            <h1>Gérez votre business <span className="highlight">facilement</span></h1>
            <p>Suivi des stocks, ventes et rapports détaillés dans une interface simple et moderne.</p>
            <button className="btn-primary">Commencer maintenant</button>
          </div>
          <div className="hero-image">
            <img src="https://via.placeholder.com/500x300" alt="Illustration Hero" />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section fade-in">
          <h2>Fonctionnalités principales</h2>
          <div className="services-cards">
            <div className="card">
              <h3>Gestion de stock</h3>
              <p>Suivez vos produits en temps réel et automatisez vos calculs.</p>
            </div>
            <div className="card">
              <h3>Suivi des ventes</h3>
              <p>Analysez vos ventes avec des graphiques interactifs.</p>
            </div>
            <div className="card">
              <h3>Rapports détaillés</h3>
              <p>Générez des rapports pour mieux décider et planifier.</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section fade-in">
          <h2>À propos de nous</h2>
          <p>El Theodoros Solutions vous accompagne dans la gestion complète de votre activité, tout en vous offrant une interface simple et intuitive.</p>
        </section>
      </main>
    </div>
  );
}