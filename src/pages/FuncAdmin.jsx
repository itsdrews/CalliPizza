import Header from "../components/Header";
import Footer from "../components/Footer";
import LinkToAdd from "../components/LinkToAdd";
import FuncTable from "../components/FuncTable";

const FuncAdmin = () => {
  return (
    <div className="admin-pizza">
      <Header admin={true} />
      <LinkToAdd item={"funcionário"} path={"/add-func"} />
      <FuncTable />
      <Footer />
    </div>
  );
};

export default FuncAdmin;
