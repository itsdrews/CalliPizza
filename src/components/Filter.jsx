import React, { useState } from "react";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
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
    <div className={`filter-container ${expanded ? "expanded" : "closed"}`}>
      {expanded ? (
        <>
          <h3>Filtrar por Tipo</h3>
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
                  className="filter-selection"
                  style={{
                    border: `2px solid ${
                      categoria === selecionada ? "#8c1c13" : "#333"
                    }`,
                    backgroundColor:
                      categoria === selecionada ? "#8c1c13" : "transparent",
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
            className="toggle-filter"
            onClick={() => {
              setExpand((prev) => !prev);
            }}
          >
            <KeyboardDoubleArrowUpOutlinedIcon sx={{ fontSize: "inherit" }} />
          </button>
        </>
      ) : (
        <>
          <h3>Filtrar</h3>
          <button
            onClick={() => {
              setExpand((prev) => !prev);
            }}
            className="toggle-filter"
          >
            <KeyboardDoubleArrowDownOutlinedIcon sx={{ fontSize: "inherit" }} />
          </button>
        </>
      )}
    </div>
  );
};

export default Filter;
