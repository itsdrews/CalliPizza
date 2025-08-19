import React, { useState, useEffect } from "react";
import PizzaCard from "../components/PizzaCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Filter from "../components/Filter";
import { usePedidos } from "../context/PedidosContext";
import { useComanda } from "../context/ComandaContext";
import { usePizzas } from "../context/PizzaContext";

const Cardapio = () => {
  const { pizzas, setPizzas } = usePizzas();
  const { pedidos, adicionarPedido } = usePedidos();
  const { comanda, setComanda } = useComanda();

  const [selecionada, setSelecionada] = useState(null);
  const [pizzasSelecionadas, setPizzasSelecionadas] = useState([]);

  useEffect(() => {
    if (selecionada)
      setPizzasSelecionadas(
        pizzas.filter((pizza) => pizza.tipo === selecionada)
      );
  }, [selecionada]);

  return (
    <>
      <Header></Header>
      <div className="cardapio-container">
        <div className="pizzas-grid">
      <Filter selecionada={selecionada} setSelecionada={setSelecionada} />
          {selecionada ? (
            <>
              <h2>{`Categoria : ${selecionada}`}</h2>
              {pizzasSelecionadas.length === 0 ? (
                <h3>Nenhuma pizza cadastrada para esta categoria</h3>
              ) : (
                <>
                  {pizzasSelecionadas.map((pizza) => (
                    <PizzaCard
                      key={pizza.id}
                      adicionarPedido={adicionarPedido}
                      pizza={pizza}
                      cardMode={"cardapio"}
                    />
                  ))}
                </>
              )}
            </>
          ) : (
            pizzas.map((pizza) => (
              <PizzaCard
                key={pizza.id}
                adicionarPedido={adicionarPedido}
                pizza={pizza}
                cardMode={"cardapio"}
              />
            ))
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Cardapio;
