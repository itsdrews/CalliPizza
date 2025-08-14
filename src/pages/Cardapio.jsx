import React, { useState, useEffect } from "react";
import PizzaCard from "../components/PizzaCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Cardapio = ({ obterPizzas }) => {
  const [pizzas, setPizzas] = useState([]);

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
  }, [obterPizzas]);

  return (
    <>
      <Header></Header>
      <div className="cardapio-container">
        <div className="pizzas-grid">
          {pizzas.slice(0, 3).map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} cardMode={"cardapio"} />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Cardapio;
