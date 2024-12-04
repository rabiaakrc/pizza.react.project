import React from "react";
import { Link } from "react-router-dom";
import "./Success.css"; // CSS dosyasının doğru şekilde yüklendiğinden emin olun

function Success() {
  return (
    <div className="success-container">
    <div className="success-hero">
      <h2 className="success-title">Teknolojik Yemekler</h2>
      <p className="success-subtitle">TEBRİKLER! <br></br>SİPARİŞİNİZ ALINDI!</p>
      <Link className="success-link" to="/">Anasayfaya Dön</Link>
     
      
    </div>
  </div>
  );
}

export default Success;
