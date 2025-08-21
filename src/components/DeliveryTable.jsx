import React from "react";
import { toast } from "react-toastify";
import { useCozinha } from "../context/CozinhaContext";
import { useFuncionario } from "../context/FuncionarioContext";

const DeliveryTable = ({ tipo, data }) => {
  const { atualizarStatusEntrega, atualizarStatusSaida } = useCozinha();
  const { funcionario } = useFuncionario();

  const confirmarAcao = (id_pedido, acao) => {
    let cpfEntregador = "";

    toast.warn(
      <div>
        {acao === "fazer-entrega" && (
          <>
            <p>O pedido {id_pedido} foi realmente entregue?</p>
            <p>A taxa de serviço foi aceita?</p>
          </>
        )}
        {acao === "sair-entrega" && (
          <>
            <p>O pedido {id_pedido} está saíndo para entrega?</p>
            <input
              type="text"
              placeholder="Nome do entregador"
              onChange={(e) => (cpfEntregador = e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "10px",
                boxSizing: "border-box",
              }}
            />
          </>
        )}
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          {acao === "fazer-entrega" && (
            <>
              <button
                onClick={() => {
                  atualizarStatusEntrega(id_pedido, true);
                  toast.dismiss();
                  toast.success("Pedido foi entregue e 10% Aceito");
                }}
                style={{
                  padding: "5px 10px",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Sim
              </button>
              <button
                onClick={() => {
                  atualizarStatusEntrega(id_pedido, false);
                  toast.dismiss();
                  toast.warn("Pedido foi entregue e 10% não foi aceito.");
                }}
                style={{
                  padding: "5px 10px",
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Não
              </button>
            </>
          )}
          {acao === "sair-entrega" && (
            <button
              onClick={() => {
                // Adiciona a verificação para garantir que o nome foi inserido
                if (cpfEntregador.trim() === "") {
                  toast.error("Por favor, insira o nome do entregador.");
                  return;
                }
                const dadosFunc = funcionario.find(
                  (func) => func.cpf === cpfEntregador
                );
                if (dadosFunc) {
                  atualizarStatusSaida(id_pedido, dadosFunc.id);
                  toast.success("Pedido saiu para a entrega");
                }
                toast.dismiss();
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
