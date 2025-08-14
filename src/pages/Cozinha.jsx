import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Cozinha.css";
const Cozinha = () => {

  const cozinha = [
  {
    "numero_pedido": 1,
    "mesa": 5,
    "endereco": "",
    "pedido": [
      {
        "id": 1,
        "nome": "Margherita",
        "tamanho": "Grande",
        "valor": 45.90
      }
    ]
  },
  {
    "numero_pedido": 2,
    "mesa": 3,
    "endereco": "",
    "pedido": [
      {
        "id": 2,
        "nome": "Calabresa",
        "tamanho": "Média",
        "valor": 39.90
      },
      {
        "id": 3,
        "nome": "Portuguesa",
        "tamanho": "Grande",
        "valor": 49.90
      }
    ]
  },
  {
    "numero_pedido": 3,
    "mesa": 0,
    "endereco": "Rua das Flores, 123 - Apartamento 101",
    "pedido": [
      {
        "id": 4,
        "nome": "Frango com Catupiry",
        "tamanho": "Família",
        "valor": 59.90
      }
    ]
  },
  {
    "numero_pedido": 4,
    "mesa": 8,
    "endereco": "",
    "pedido": [
      {
        "id": 5,
        "nome": "Quatro Queijos",
        "tamanho": "Grande",
        "valor": 49.90
      },
      {
        "id": 6,
        "nome": "Refrigerante",
        "tamanho": "Lata",
        "valor": 7.90
      }
    ]
  }
]
const handleItemClick = (id) => {
    setItens(prevItens => 
      prevItens.map(item => {
        if (item.id === id) {
          // Se estiver em modo de seleção única, desmarca os outros
          if (!modoSelecaoMultipla) {
            return { ...item, selecionado: !item.selecionado };
          } else {
            // Em modo múltiplo, apenas alterna o estado do item clicado
            return { ...item, selecionado: !item.selecionado };
          }
        }
        // Em modo único, desmarca todos os outros
        return modoSelecaoMultipla ? item : { ...item, selecionado: false };
      })
    );
  };

  return (
    <div>
      <Header />
      <div className="cozinha-container">
        <div className="pedidos-dashboard">
          <h1 className="pedidos-title">Pedidos</h1>
          <div className="pedidos-grid-container">
              {cozinha.map(item => (
          <button
            key={item.id}
            className={`item ${item.selecionado ? 'selecionado' : ''}`}
            onClick={() => handleItemClick(item.id)}
          >{item.numero_pedido}
            {item.nome}
            {item.selecionado && <div className="marcador-selecao">✓</div>}
          </button>
        ))}
          </div>
        </div>
        <div className="pedido-details">
          <p>detalhes do pedido</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cozinha;
