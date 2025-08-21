import Header from "../components/Header";
import Footer from "../components/Footer";
import PizzaTable from "../components/PizzaTable";
import LinkToAdd from "../components/LinkToAdd";

const PizzaAdmin = () => {
  return (
    <div className="admin-pizza">
      <Header admin={true} />
      <LinkToAdd item={"pizza"} path={"/add-sabor"} />
      <PizzaTable />
      <Footer />
    </div>
  );
};

export default PizzaAdmin;
