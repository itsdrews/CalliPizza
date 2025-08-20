import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Cozinha.css";
import { useCozinha } from "../context/CozinhaContext";
import { toast } from "react-toastify";

const Cozinha = () => {
  const [comandaSelecionado, setComandaSelecionado] = useState(null);
  const { cozinha, atualizarStatusComanda } = useCozinha();
  const [activeItems, setActiveItems] = useState([]);

  const toDoCozinha = cozinha.filter((c) => !c.pronto);

  const handleSelecionarComanda = (comanda) => {
    setComandaSelecionado(comanda);
    setActiveItems([]);
  };
  const toggleActive = (id, tamanho) => () => {
    const key = `${id}-${tamanho}`;
    setActiveItems((prev) =>
      prev.includes(key)
        ? prev.filter((itemKey) => itemKey !== key)
        : [...prev, key]
    );
  };
  const handleEnviarParaEntrega = (activeItems, pedidos, id) => {
    console.log(pedidos);
    atualizarStatusComanda(id);
    return pedidos.length === activeItems.length
      ? toast.success("Enviado para entrega!")
      : toast.error("Um ou mais itens não está pronto!");
  };
  return (
    <div>
      <Header />
      <div className="cozinha-container">
        <h2>Pedidos</h2>
        <div className="pedidos-grid">
          {toDoCozinha.map((p) => (
            <div className="pedido-container" key={p.id}>
              <button
                className={comandaSelecionado?.id === p.id ? "selecionado" : ""}
                onClick={() => handleSelecionarComanda(p)}
              >
                {" "}
                {p.id < 10 ? `00${p.id}` : `0${p.id}`}
              </button>
            </div>
          ))}
        </div>
        <h2>
          Itens do Pedido{" "}
          {comandaSelecionado
            ? comandaSelecionado.id < 10
              ? `00${comandaSelecionado.id}`
              : `0${comandaSelecionado.id}`
            : "--"}{" "}
          -{" "}
          {comandaSelecionado
            ? comandaSelecionado.mesa
              ? `Mesa ${comandaSelecionado.mesa}`
              : "Entrega"
            : ""}
        </h2>

        {comandaSelecionado?.pedidos.map((item) => {
          const isActive = activeItems.includes(`${item.id}-${item.tamanho}`);
          return (
            <div key={`${item.id}-${item.tamanho}`} className="pedido-details">
              <button
                className={`pedido-details-checkbox${
                  isActive ? "-active" : ""
                }`}
                onClick={toggleActive(item.id, item.tamanho)}
              ></button>
              <div className="details-name-ing">
                <h3 className="pedido-name-size">{`${item.nome} - ${item.tamanho}`}</h3>
                <p>{item.ingredientes}</p>
              </div>
            </div>
          );
        }) || <h3>Ainda não há detalhes, selecione um pedido!</h3>}
        <button
          type="submit"
          className="entrega-button"
          onClick={() =>
            handleEnviarParaEntrega(
              activeItems,
              comandaSelecionado.pedidos,
              comandaSelecionado.id
            )
          }
        >
          ENVIAR PARA A ENTREGA
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Cozinha;
