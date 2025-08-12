import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PizzaCard from '../components/PizzaCard'
const Comanda = () => {
    const comanda = [
    {
      id: 1,
      nome: "Margherita",
      tamanho: "Grande",
      descricao: "A clássica pizza italiana com ingredientes frescos",
      ingredientes: ["Molho de tomate", "Mussarela premium", "Manjericão fresco", "Azeite de oliva"],
      valor: 43,
      quantidade: 1
    },
     {
      id: 2,
      nome: "Calabresa",
      tamanho: "Média",
      descricao: "A clássica pizza italiana com ingredientes frescos",
      ingredientes: ["Molho de tomate", "Mussarela premium", "Manjericão fresco", "Azeite de oliva"],
      valor: 50,
      quantidade: 3
    },
     {
      id: 3,
      nome: "Frango com Catupiry",
      tamanho: "Família",
      descricao: "A clássica pizza italiana com ingredientes frescos",
      ingredientes: ["Molho de tomate", "Mussarela premium", "Manjericão fresco", "Azeite de oliva"],
      valor: 65,
      quantidade: 4
    }
  ];
 const calcularTotal = (comanda) =>{

  const total = comanda.reduce(
    (total,item) => total + (item.valor * item.quantidade),0
  );
  
  return total

 }// ##To do: Container da mesa e lógica de comanda
  return (
    <>
    <Header></Header>
    <div className="cardapio-container">
      <div className="pizzas-grid">
        {comanda.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} cardMode={"comanda"}/>
        ))}
      </div>
      <div className="delivery-type-container">
        <div className="table">
          <h2>Mesa</h2>
          <p>Número da mesa</p>
          <p>{comanda.mesa}</p>
        </div>
        <div className="delivery">
          <h2>Entrega</h2>
          <p>Endereço</p>
          <label htmlFor="">Endereço de entrega <input className='address-input-container'  placeholder='Digite o endereço de entrega'type="text" /> </label>
         
        </div>
      </div>
      <p className='total'>Total: R$ {calcularTotal(comanda)}</p>
  
    </div>
    <Footer></Footer>

    </>
   
  )
}

export default Comanda
