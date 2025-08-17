// contexts/PedidosContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
const PedidosContext = createContext();
const LOCAL_STORAGE_KEY = 'pedidos';
export const PedidosProvider = ({ children }) => {
    const [pedidos, setPedidos] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });


  // Atualiza o localStorage sempre que os pedidos mudarem
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pedidos));
  }, [pedidos]);
  // TODO: USAR CONTEXTO DE PEDIDOS PARA ADICIONAR AO VETOR PEDIDOS.
  const adicionarPedido = (novoPedidoId,novoPedidoNome,novoPedidoTamanho,novoPedidoValor) => {
    const novoPedido = {
      id:novoPedidoId,
      nome:novoPedidoNome,
      tamanho:novoPedidoTamanho,
      valor: novoPedidoValor,
      quantidade: 1
    }
    console.log(novoPedido)
    const pedidoDuplicado = pedidos.some(p => 
    p.id === novoPedidoId && 
    p.tamanho === novoPedidoTamanho    
  );

  if (!pedidoDuplicado) {
    setPedidos([...pedidos, novoPedido]);
    console.log("Pedido adicionado!");
  } else {
    console.log("Já existe um pedido com este ID e tamanho.");
  }
   
    
  }
  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        adicionarPedido
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error('usePedidos deve ser usado dentro de um PedidosProvider');
  }
  return context;
};