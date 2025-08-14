import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddPizza from "../components/AddPizza";

const CadastrarPizza = ({ pizza = null, cadastrarPizza, editarPizza }) => {
  return (
    <div className="admin-pizza">
      <Header admin={true} />
      <AddPizza
        pizzas={pizza}
        cadastrarPizza={cadastrarPizza}
        editarPizza={editarPizza}
      />
      <Footer />
    </div>
  );
};

export default CadastrarPizza;
