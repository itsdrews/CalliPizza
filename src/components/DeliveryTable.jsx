import React from "react";
import { toast } from "react-toastify";
import { useCozinha } from "../context/CozinhaContext";

const DeliveryTable = ({ tipo, data }) => {
  const { atualizarStatusEntrega, atualizarStatusSaida } = useCozinha();

  const confirmarAcao = (id_pedido, acao) => {
    toast.warn(
      <div>
        {acao === "fazer-entrega" && (
          <p>O pedido {id_pedido} foi realmente entregue?</p>
        )}
        {acao === "sair-entrega" && (
          <p>O pedido {id_pedido} está saíndo para entrega?</p>
        )}
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          {acao === "fazer-entrega" && (
            <button
              onClick={() => {
                atualizarStatusEntrega(id_pedido);
                toast.dismiss();
                toast.success("Pedido saiu para a entrega");
              }}
              style={{
                padding: "5px 10px",
                background: "#ff4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Confirmar
            </button>
          )}
          {acao === "sair-entrega" && (
            <button
              onClick={() => {
                atualizarStatusSaida(id_pedido);
                toast.dismiss();
                toast.success("Pedido saiu para a entrega");
              }}
              style={{
                padding: "5px 10px",
                background: "#ff4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Confirmar
            </button>
          )}

          <button
            onClick={() => toast.dismiss()}
            style={{
              padding: "5px 10px",
              background: "#ccc",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        draggable: false,
        closeOnClick: false,
      }
    );
  };

  return (
    <div className="delivery-container">
      <div>
        {data.map((c) => (
          <ul className="pedido" key={c.id}>
            <li>
              <h2>
                {c.id} - {c.mesa ? `Mesa ${c.mesa}` : "Entrega"}
              </h2>
              <div className="buttons">
                {c.endereco && (
                  <button onClick={() => window.confirm(c.endereco)}>
                    Endereço
                  </button>
                )}
                {tipo === "prontos" && (
                  <button onClick={() => confirmarAcao(c.id, "sair-entrega")}>
                    Entregar
                  </button>
                )}
                {tipo === "saida" && (
                  <button onClick={() => confirmarAcao(c.id, "fazer-entrega")}>
                    Entregue
                  </button>
                )}
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default DeliveryTable;
