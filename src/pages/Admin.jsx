import Header from "../components/Header";
import Footer from "../components/Footer";
import PizzaTable from "../components/PizzaTable";

const Admin = ({ pizzas, setPizzas, removerPizza }) => {
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
