import Header from "../components/Header";
import Footer from "../components/Footer";
import DeliveryTable from "../components/DeliveryTable";
import { useCozinha } from "../context/CozinhaContext";

const Historico = () => {
  const { cozinha } = useCozinha();
  const prontos = cozinha.filter((c) => !c.saida && c.pronto);
  const saida = cozinha.filter((c) => c.saida && !c.entregue);

  return (
    <>
      <Header />
      <div className="delivery-pizza">
        <h2>Prontos</h2>
        <DeliveryTable tipo="prontos" data={prontos} />
        <h2>Saíram para entrega</h2>
        <DeliveryTable tipo="saida" data={saida} />
      </div>
      <Footer />
    </>
  );
};

export default Historico;
