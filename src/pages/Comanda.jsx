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
 
  return (
    <>
    <Header></Header>
    <div className="cardapio-container">
      <div className="pizzas-grid">
        {comanda.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} cardMode={"comanda"}/>
        ))}
      </div>

  
    </div>
    <Footer></Footer>

    </>
   
  )
}

export default Comanda
