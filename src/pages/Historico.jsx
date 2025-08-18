import Header from "../components/Header";
import Footer from "../components/Footer";
import HistoryTable from "../components/HistoryTable";

const Historico = () => {
  return (
    <div className="admin-pizza">
      <Header admin={true} />
      <HistoryTable />
      <Footer />
    </div>
  );
};

export default Historico;
