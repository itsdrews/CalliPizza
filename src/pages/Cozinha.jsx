import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Cozinha.css";
import { useCozinha } from "../context/CozinhaContext";
const Cozinha = () => {
  const [selecionado,setSelecionado] = useState(false);
  useEffect(()=> {
    console.log('alterou')
  },[comandaSelecionada])
  const {cozinha,atualizarStatusComanda} = useCozinha();
  return (
    <div>
      <Header />
      <div className="cozinha-container">
        <h2>Pedidos</h2>
        <div className="pedidos-grid">
            {(cozinha.map(p => (
              <div className="pedido-container">
                <button onClick={() => setSelecionado(!selecionado)}
                  > 00{p.id}</button>
              </div>
            // TO DO: Setar button selecionado e mudar a cor, passando os detalhes pra div de baixo.
            )))}
        </div>
            <h2>Itens do Pedido {comandaSelecionada} - Mesa 00</h2>
            <div className="pedido-details">
              <p>Itens da comanda</p>
            </div>
            <button>Enviar para Entrega</button>
      
        
      </div>
      <Footer />
    </div>
  );
};

export default Cozinha;
