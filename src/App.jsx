import React, { useEffect, useState } from "react";

import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const API_URL = "http://localhost:3001";

  const [pizzas, setPizzas] = useState([]);

  // CREATE
  async function inserirPizza(pizzaData) {
    try {
      const response = await fetch(`${API_URL}/pizzas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pizzaData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar pizza: ${response.statusText}`);
      }

      const newPizza = await response.json();
      console.log("Pizza criada com sucesso:", newPizza);
      return newPizza;
    } catch (error) {
      console.error("Falha ao criar pizza:", error);
    }
  }

  // READ
  async function obterPizzas() {
    try {
      const response = await fetch(`${API_URL}/pizzas`);

      if (!response.ok) {
        throw new Error(`Erro ao ler pizzas: ${response.statusText}`);
      }

      const pizzas = await response.json();
      console.log("Pizzas carregadas:", pizzas);
      return pizzas;
    } catch (error) {
      console.error("Falha ao ler pizzas:", error);
    }
  }

  // UPDATE
  async function editarPizza(id, updatedPizzaData) {
    try {
      const response = await fetch(`${API_URL}/pizzas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPizzaData),
      });

      if (!response.ok) {
        throw new Error(
          `Erro ao atualizar pizza com ID ${id}: ${response.statusText}`
        );
      }

      const updatedPizza = await response.json();
      console.log("Pizza atualizada com sucesso:", updatedPizza);
      return updatedPizza;
    } catch (error) {
      console.error(`Falha ao atualizar pizza com ID ${id}:`, error);
    }
  }

  // DELETAR
  async function removerPizza(id) {
    try {
      const response = await fetch(`${API_URL}/pizzas/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Erro ao deletar pizza com ID ${id}: ${response.statusText}`
        );
      }

      console.log(`Pizza com ID ${id} deletada com sucesso.`);
      return true; // Retorna true em caso de sucesso
    } catch (error) {
      console.error(`Falha ao deletar pizza com ID ${id}:`, error);
      return false;
    }
  }

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const data = await obterPizzas();
        setPizzas(data);
      } catch (e) {
        console.error("Erro ao obter pizzas: ", e);
      }
    };

    fetchPizzas();

    return () => {};
  }, []);

  return (
    <AppRoutes
      pizzas={pizzas}
      setPizzas={setPizzas}
      inserirPizza={inserirPizza}
      obterPizzas={obterPizzas}
      editarPizza={editarPizza}
      removerPizza={removerPizza}
    />
  );
}

export default App;
