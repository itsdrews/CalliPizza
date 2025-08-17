import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Cozinha.css";
import { useCozinha } from "../context/CozinhaContext";
const Cozinha = () => {
  const {cozinha,atualizarStatusComanda} = useCozinha();
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
