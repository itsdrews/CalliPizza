import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Cozinha.css";
const Cozinha = () => {
  console.log(localStorage.getItem('cozinha'));
  return (
    <div>
      <Header />
      <div className="cozinha-container">
        
      </div>
      <Footer />
    </div>
  );
};

export default Cozinha;
