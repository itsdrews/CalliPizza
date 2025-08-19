import Header from "../components/Header";
import Footer from "../components/Footer";
import DeliveryTable from "../components/DeliveryTable";
import { useCozinha } from "../context/CozinhaContext";

const Historico = () => {
  const { cozinha } = useCozinha();
  const prontos = cozinha.filter((c) => !c.entregue && c.pronto);
  const saida = cozinha.filter((c) => c.entregue);
  const em_preparo = cozinha.filter((c) => !c.pronto);

  return (
    <>
      <Header />
      <div className="delivery-pizza">
        <h2>Prontos</h2>
        <DeliveryTable tipo="prontos" data={prontos} />
        <h2>Em Preparo</h2>
        <DeliveryTable tipo="em-preparo" data={em_preparo} />
      </div>
      <Footer />
    </>
  );
};

export default Historico;
