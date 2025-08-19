import React from "react";

const DeliveryTable = ({ tipo, data }) => {
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
                {tipo === "prontos" && <button>Entregar</button>}
                {tipo === "saida" && <button>Entregue</button>}
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default DeliveryTable;
