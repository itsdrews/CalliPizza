import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PizzaTable from "../components/PizzaTable";

const Admin = ({ obterPizzas, removerPizza }) => {
  return (
    <div className="admin-pizza">
      <Header admin={true} />
      <PizzaTable />
      <Footer />
    </div>
  );
};

export default Admin;
