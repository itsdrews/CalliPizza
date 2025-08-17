import React, { useState, useEffect } from "react";
import PizzaCard from "../components/PizzaCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { usePedidos } from "../context/PedidosContext";
import { useComanda } from "../context/ComandaContext";
const Cardapio = ({ obterPizzas }) => {
  const [pizzas, setPizzas] = useState([]);
  const {pedidos,adicionarPedido} = usePedidos();
  const {comanda,setComanda} = useComanda();

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
          {pizzas.map((pizza) => (
            <PizzaCard key={pizza.id} adicionarPedido = {adicionarPedido} pizza={pizza} cardMode={"cardapio"} />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Cardapio;
