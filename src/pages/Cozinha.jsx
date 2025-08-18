import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Cozinha.css";
import { useCozinha } from "../context/CozinhaContext";
const Cozinha = () => {

  const [comandaSelecionado,setComandaSelecionado] = useState(null)
  const {cozinha,atualizarStatusComanda} = useCozinha();

  const handleSelecionarComanda = (comanda) => {
    console.log("selecionado: ")
    console.log(comanda)
    setComandaSelecionado(comanda);
  }
  return (
    <div>
      <Header />
      <div className="cozinha-container">
        <h2>Pedidos</h2>
        <div className="pedidos-grid">
            {(cozinha.map(p => (
              <div key={p.id} className="pedido-container">
                <button className={comandaSelecionado?.id===p.id?"selecionado":""} onClick={() => handleSelecionarComanda(p)}
                  > 00{p.id}</button>
              </div>
            // TO DO: Setar button selecionado e mudar a cor, passando os detalhes pra div de baixo.
            )))}
        </div>
            <h2>Itens do Pedido {comandaSelecionado?.id|| "--" } - Mesa {comandaSelecionado?.mesa || "--" }</h2>
            <div className="pedido-details">
              <p>Itens da comanda</p>
            </div>
            <button type="submit">Enviar para Entrega</button>
      
        
      </div>
      <Footer />
    </div>
  );
};

export default Cozinha;
