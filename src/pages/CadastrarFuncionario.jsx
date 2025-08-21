import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddFunc from "../components/AddFunc";

const CadastrarFuncionario = ({ idfunc }) => {
  console.log("Alterando Funcionário:", idfunc);

  return (
    <div className="admin-pizza">
      <Header admin={true} />
      <AddFunc idfunc={idfunc} />
      <Footer />
    </div>
  );
};

export default CadastrarFuncionario;
