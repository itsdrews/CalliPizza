import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PizzaTable from "../components/PizzaTable";

const Admin = ({ obterPizzas, removerPizza }) => {
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
    <div className="admin-pizza">
      <Header admin={true} />
      <PizzaTable
        pizzas={pizzas}
        setPizzas={setPizzas}
        removerPizza={removerPizza}
      />
      <Footer />
    </div>
  );
};

export default Admin;
