import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PizzaCard from '../components/PizzaCard'
import {useState} from 'react'
const Comanda = () => {
    // TO DO: ACESSAR PEDIDOS ANINHADO EM COMANDA
    const comandas = [{

        mesa:1,
        endereco: null,
        pedido:[{
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
    
  ]
},
{

        mesa:2,
        endereco: null,
        pedido:[
     {
      id: 1,
      nome: "Calabresa",
      tamanho: "Média",
      descricao: "A clássica pizza italiana com ingredientes frescos",
      ingredientes: ["Molho de tomate", "Mussarela premium", "Manjericão fresco", "Azeite de oliva"],
      valor: 50,
      quantidade: 3
    },
     
    
  ]
}
]
  const [numeroBusca,setNumeroBusca] = useState(0)
  const [mesaSelected,setMesaSelected] =useState(null);

  const handleBuscaChange = (e) => {
    setNumeroBusca(parseInt(e.target.value)||0 );
    setMesaSelected(numeroBusca)
  }
  const mesaFiltrada = comandas.filter(comanda =>
    comanda.mesa===numeroBusca
  )
  const pedidos = mesaFiltrada? mesaFiltrada.find (c => c.mesa ===mesaSelected)?.pedido|| []:[];



const calcularTotal = (pedidos) =>{

  const total = pedidos.reduce(
    (total,item) => total + (item.valor * item.quantidade),0
  );
  
  return total

 }
  return (
    <>
    <Header></Header>
    <div className="cardapio-container">
      <div className="pizzas-grid">
        {pedidos.length!=0 ? pedidos.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} cardMode={"comanda"}/>
        )): <h1 className='comanda-not-found'>
          Comanda não encontrada!
        </h1>}
      </div>
      <div className="delivery-type-container">
        <div className="table">
          <h2>Mesa</h2>
          <p>Número da mesa</p>
          <div className="busca-mesa">

            <input 
              type ="text"
              value={numeroBusca}
              onChange={(e) =>handleBuscaChange(e)}
              placeholder='mesa'
            />
          </div>
        </div>
        <div className="delivery-separator"></div>
        <div className="delivery">
          <h2>Entrega</h2>
          <p>Endereço</p>
          <input className='address-input-container' type='text' placeholder='Digite o endereço de entrega'/>
         
        </div>
      </div>
      <div className="total-submit">

      <p className='total'>Total: R$ {calcularTotal(pedidos)}</p>
      <button onSubmit={console.log("Submit do button")}>ENVIAR PARA A COZINHA</button>
      </div>
    </div>
    <Footer></Footer>

    </>
   
  )
}

export default Comanda
