import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PizzaCard from "../components/PizzaCard";
import { useState, useCallback, useEffect, useMemo } from "react";
import { usePedidos } from "../context/PedidosContext";
import { toast } from "react-toastify";
import { useComanda } from "../context/ComandaContext";

const Comanda = () => {
  const PEDIDOS_LOCAL_STORAGE_KEY = "pedidos";
  const gerarUUID = () => crypto.randomUUID();
  const [mesaInput, setMesaInput] = useState("");
  const [enderecoInput, setEnderecoInput] = useState("");

  // Calcula os estados desativados diretamente baseado nos valores
  const mesaInputDesativado = enderecoInput !== "";
  const enderecoInputDesativado = mesaInput !== "";

  // Limpa o campo quando for desativado
  useEffect(() => {
    if (mesaInputDesativado && mesaInput !== "") {
      setMesaInput("");
    }
  }, [mesaInputDesativado]);

  useEffect(() => {
    if (enderecoInputDesativado && enderecoInput !== "") {
      setEnderecoInput("");
    }
  }, [enderecoInputDesativado]);

  const { pedidos, setPedidos } = usePedidos();
  const { confirmarMandarParaCozinha } = useComanda();

  const removerItem = (id, tamanho) => {
    toast.success(`Item removido com sucesso!`);
    setPedidos((prev) =>
      prev.filter((item) => !(item.id === id && item.tamanho === tamanho))
    );
  };

  const aumentarQuantidade = useCallback((id, tamanho) => {
    setPedidos((prev) => {
      const item = prev.find((p) => p.id === id && p.tamanho === tamanho);
      if (!item) return prev;
      const novaQuantidade = item.quantidade + 1;
      return prev.map((p) =>
        p.id === id && p.tamanho === tamanho
          ? { ...p, quantidade: novaQuantidade }
          : p
      );
    });
  }, []);

  // Handler seguro para diminuir
  const diminuirQuantidade = useCallback((id, tamanho) => {
    setPedidos((prev) => {
      const item = prev.find((p) => p.id === id && p.tamanho === tamanho);
      if (!item || item.quantidade <= 1) return prev;

      const novaQuantidade = item.quantidade - 1;
      return prev.map((p) =>
        p.id === id && p.tamanho === tamanho
          ? { ...p, quantidade: novaQuantidade }
          : p
      );
    });
  }, []);

  const pedidosComanda = pedidos;

  const calcularTotal = (pedidosComanda) => {
    const total = pedidosComanda.reduce(
      (total, item) => total + item.valor * item.quantidade,
      0
    );

    return total;
  };
  const [total, setTotal] = useState(calcularTotal(pedidosComanda));
  useEffect(() => {
    setTotal(calcularTotal(pedidosComanda));
  }, [pedidosComanda]);

  return (
    <>
      <Header></Header>
      <div className="cardapio-container">
        <div className="pizzas-grid">
          {pedidosComanda.length != 0 ? (
            pedidosComanda.map((pizza) => (
              <PizzaCard
                key={gerarUUID()}
                pizza={pizza}
                deletePizza={removerItem}
                onIncrease={aumentarQuantidade}
                onDecrease={diminuirQuantidade}
                cardMode={"comanda"}
              />
            ))
          ) : (
            <h1 className="comanda-not-found">Comanda Vazia!</h1>
          )}
        </div>
        <div className="delivery-type-container">
          <div className="table">
            <h2>Mesa</h2>
            <p>Nº da mesa</p>
            <div className="busca-mesa">
              <input
                value={mesaInput}
                onChange={(e) => setMesaInput(e.target.value)}
                className="mesa-comanda"
                type="number"
                placeholder="mesa"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="delivery-separator"></div>
          <div className="delivery">
            <h2>Entrega</h2>
            <p>Endereço</p>
            <input
              value={enderecoInput}
              onChange={(e) => setEnderecoInput(e.target.value)}
              className="address-input-container"
              type="text"
              placeholder="Digite o endereço de entrega"
            />
          </div>
        </div>
        <div className="total-submit">
          <p className="total">Total: R$ {total.toFixed(2)}</p>
          <button
            type="submit"
            onClick={() =>
              confirmarMandarParaCozinha(
                pedidos,
                mesaInput,
                enderecoInput,
                total
              )
            }
          >
            ENVIAR PARA A COZINHA
          </button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Comanda;
