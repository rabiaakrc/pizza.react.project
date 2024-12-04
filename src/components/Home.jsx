import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order");
  };

  return (
    <div className="home-container">
      <div className="hero">
        <h2 className="title">Teknolojik Yemekler</h2>
        <p className="subtitle">KOD AÇIKTIRIR <br></br>PİZZA, DOYURUR</p>
        <button className="order-btn" onClick={handleOrderClick}>
          ACIKTIM
        </button>
      </div>
    </div>
  );
}

export default Home;
