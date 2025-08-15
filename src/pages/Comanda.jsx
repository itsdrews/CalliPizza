import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PizzaCard from '../components/PizzaCard'
import {useState,useCallback} from 'react'
import { useNavigate } from 'react-router-dom'
const Comanda = () => {
    
  const [comanda,setComanda] =useState( {
      mesa:1,
      endereco: null,
      pronto:false,
      entregue:false, 
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
  })
  const pedidos = comanda.pedido;
 // Função otimizada com useCallback para evitar recriações desnecessárias
  const deletarPizza =  useCallback((id, novaQuantidade) => {
    setComanda(prev => {
      // Verifica se a quantidade realmente mudou
      const item = prev.pedido.find(p => p.id === id);
      novaQuantidade = 0;
      // Atualiza apenas se necessário
      return {
        ...prev,
        pedido: prev.pedido.map(item => 
          item.id === id ? { ...item, quantidade: novaQuantidade } : item
        )
      };
    });
  }, []);

    const removerItem = (id) => {
    setComanda(prev => ({
      ...prev,
      pedido: prev.pedido.filter(item => item.id !== id)
    }));
  };


  // Handler seguro para aumentar
  const aumentarQuantidade = useCallback((id) => {
    setComanda(prev => {
      const item = prev.pedido.find(p => p.id === id);
      if (!item) return prev;

      const novaQuantidade = item.quantidade + 1;
      return {
        ...prev,
        pedido: prev.pedido.map(p => 
          p.id === id ? { ...p, quantidade: novaQuantidade } : p
        )
      };
    });
  }, []);

  // Handler seguro para diminuir
  const diminuirQuantidade = useCallback((id) => {
    setComanda(prev => {
      const item = prev.pedido.find(p => p.id === id);
      if (!item || item.quantidade <= 1) return prev;

      const novaQuantidade = item.quantidade - 1;
      return {
        ...prev,
        pedido: prev.pedido.map(p => 
          p.id === id ? { ...p, quantidade: novaQuantidade } : p
        )
      };
    });
  }, []);




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
        {pedidos.length!=0 ?pedidos.map((pizza) => ( 
         
          <PizzaCard key={pizza.id} pizza={pizza} deletePizza = {removerItem} onIncrease = {aumentarQuantidade} onDecrease ={diminuirQuantidade} cardMode={"comanda"}/>
      
        )): <h1 className='comanda-not-found'>
          Comanda Vazia!
        </h1>}
      </div>
      <div className="delivery-type-container">
        <div className="table">
          <h2>Mesa</h2>
          <p>Nº da mesa</p>
          <div className="busca-mesa">

            <input 
              className='mesa-comanda'
              type ="number"
              placeholder='mesa'
              inputMode='numeric'
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
      <button type="submit">ENVIAR PARA A COZINHA</button>
      </div>
    </div>
    <Footer></Footer>

    </>
   
  )
}

export default Comanda
