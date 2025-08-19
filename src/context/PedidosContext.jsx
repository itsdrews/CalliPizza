import React, { createContext, useState, useContext } from "react";
import { useEffect } from "react";
const PedidosContext = createContext();
const LOCAL_STORAGE_KEY = "pedidos";
import { toast } from "react-toastify";
export const PedidosProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pedidos));
  }, [pedidos]);

  const adicionarPedido = (
    novoPedidoId,
    novoPedidoNome,
    novoPedidoTamanho,
    novoPedidoValor
  ) => {
    const novoPedido = {
      id: novoPedidoId,
      nome: novoPedidoNome,
      tamanho: novoPedidoTamanho,
      valor: novoPedidoValor,
      quantidade: 1,
    };
    console.log(novoPedido);
    const pedidoDuplicado = pedidos.some(
      (p) => p.id === novoPedidoId && p.tamanho === novoPedidoTamanho
    );

    if (!pedidoDuplicado) {
      setPedidos([...pedidos, novoPedido]);
      toast.success(`${novoPedidoNome} (${novoPedidoTamanho}) adicionado!`, {
        icon: "🍽️",
      });
    } else {
      toast.warn(
        `${novoPedidoNome} (${novoPedidoTamanho}) Já existe na comanda!`
      );
    }
  };
  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        setPedidos,
        adicionarPedido,
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
};

export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error("usePedidos deve ser usado dentro de um PedidosProvider");
  }
  return context;
};
