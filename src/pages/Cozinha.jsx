import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Cozinha.css";
import { useCozinha } from "../context/CozinhaContext";
import { toast } from "react-toastify";
const Cozinha = () => {
  const [comandaSelecionado,setComandaSelecionado] = useState(null)
  const {cozinha,atualizarStatusComanda} = useCozinha();
  const [activeTamanhos, setActiveTamanhos] = useState([]);
  
 
  const handleSelecionarComanda = (comanda) => {
    setComandaSelecionado(comanda);
    setActiveTamanhos([])
  }
  const toggleActive = (tamanho) => () => {
    setActiveTamanhos(prev => 
      prev.includes(tamanho) 
        ? prev.filter(itemTamanho => itemTamanho !== tamanho)
        : [...prev, tamanho]
    );
  };
  const handleEnviarParaEntrega = (activeTamanhos,pedidos) =>{
              console.log(pedidos)
              return (pedidos.length===activeTamanhos.length)? toast.success("Enviado para cozinha!"):toast.error("Um ou mais itens não está pronto!")
            }
  return (
    <div>
      <Header />
      <div className="cozinha-container">
        <h2>Pedidos</h2>
        <div className="pedidos-grid">
            {(cozinha.map(p => (
              <div className="pedido-container">
                <button className={comandaSelecionado?.id===p.id?"selecionado":""} onClick={() => handleSelecionarComanda(p)}
                  > {p.id<10?`00${p.id}`:`0${p.id}`}</button>
              </div>
            )))}
        </div>
            <h2>Itens do Pedido {comandaSelecionado? ((comandaSelecionado.id<10)?`00${comandaSelecionado.id}`:`0${comandaSelecionado.id}`): "--" } - Mesa {comandaSelecionado?.mesa || "--" }</h2>

            {comandaSelecionado?.pedidos.map((item) =>{
              
              const isActive = activeTamanhos.includes(item.tamanho)
              return(
              <div key={item.id} className="pedido-details">
              <button 
              className={`pedido-details-checkbox${isActive?'-active':''}`}
              onClick={toggleActive(item.tamanho)}
              ></button>
              <div className="details-name-ing">
              <h3 className="pedido-name-size">{`Pizza de ${item.nome} - ${ item.tamanho}`}</h3>
              <p>{item.ingredientes}</p>
              </div>
            </div>

              )
            }

            ) || <h3>Ainda não há detalhes, selecione um pedido!</h3>
          }
            <button type="submit" className="entrega-button" onClick={() =>handleEnviarParaEntrega(activeTamanhos,comandaSelecionado.pedidos)}>ENVIAR PARA A ENTREGA</button>
      
        
      </div>
      <Footer />
    </div>
  );
};

export default Cozinha;
