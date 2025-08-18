import React, { useState } from "react";
import { usePizzas } from "../context/PizzaContext";

const Filter = ({ selecionada, setSelecionada }) => {
  const { categorias } = usePizzas();
  const [expanded, setExpand] = useState(false);

  const handleSelect = (categoria) => {
    if (categoria === selecionada) {
      setSelecionada(null);
    } else {
      setSelecionada(categoria);
    }
  };

  return (
    <>
      {expanded ? (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>Filtrar por Tipo</h3>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            {categorias.map((categoria) => (
              <div
                key={categoria}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => handleSelect(categoria)}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: `2px solid ${
                      categoria === selecionada ? "#d32f2f" : "#ccc"
                    }`,
                    backgroundColor:
                      categoria === selecionada ? "#d32f2f" : "transparent",
                    transition: "background-color 0.2s, border-color 0.2s",
                  }}
                ></div>
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "2.4rem",
                    color: "#333",
                  }}
                >
                  {categoria}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setExpand((prev) => !prev);
            }}
          >
            ^
          </button>
        </div>
      ) : (
        <div>
          <h2>Filtrar</h2>
          <button
            onClick={() => {
              setExpand((prev) => !prev);
            }}
          >
            V
          </button>
        </div>
      )}
    </>
  );
};

export default Filter;
