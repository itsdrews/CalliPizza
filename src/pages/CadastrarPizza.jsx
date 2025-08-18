import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddPizza from "../components/AddPizza";

const CadastrarPizza = ({ idpizza }) => {
  console.log("Alterando pizza:", idpizza);

  return (
    <div className="admin-pizza">
      <Header admin={true} />
      <AddPizza idpizza={idpizza} />
      <Footer />
    </div>
  );
};

export default CadastrarPizza;
