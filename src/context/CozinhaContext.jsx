import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CozinhaContext = createContext();
const API_URL = "http://localhost:3001/cozinha";

export const CozinhaProvider = ({ children }) => {
  const [cozinha, setCozinha] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to handle errors
  const handleError = (err, message) => {
    setError(err.message);
    console.error(err);
    toast.error(message);
  };

  useEffect(() => {
    const fetchCozinha = async () => {
      try {
        const response = await axios.get(API_URL);
        setCozinha(response.data);
      } catch (err) {
        handleError(
          err,
          "Falha ao carregar cozinha. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCozinha();
  }, []);

  const adicionarComanda = async (novaComanda) => {
    try {
      const response = await axios.post(API_URL, novaComanda);
      // Add the item to the state only after a successful API response
      setCozinha((prev) => [...prev, response.data]);
      toast.success("Enviado para a cozinha com sucesso!");
    } catch (err) {
      handleError(err, "Erro com dados da cozinha.");
    }
  };

  const atualizarStatusComanda = async (comandaId) => {
    try {
      const comandaToUpdate = cozinha.find((c) => c.id === comandaId);
      if (!comandaToUpdate) {
        throw new Error("Comanda not found");
      }

      const updatedStatus = { pronto: !comandaToUpdate.pronto };

      const response = await axios.patch(
        `${API_URL}/${comandaId}`,
        updatedStatus
      );

      // Update the state with the server's response
      setCozinha((prev) =>
        prev.map((comanda) =>
          comanda.id === comandaId ? { ...comanda, ...response.data } : comanda
        )
      );
      toast.success("Status da comanda atualizado!");
    } catch (err) {
      handleError(err, "Erro ao atualizar a comanda da cozinha.");
    }
  };

  const atualizarStatusEntrega = async (comandaId) => {
    try {
      const comandaToUpdate = cozinha.find((c) => c.id === comandaId);
      if (!comandaToUpdate) {
        throw new Error("Comanda not found");
      }

      const updatedStatus = { entregue: !comandaToUpdate.entregue };

      const response = await axios.patch(
        `${API_URL}/${comandaId}`,
        updatedStatus
      );

      // Update the state with the server's response
      setCozinha((prev) =>
        prev.map((comanda) =>
          comanda.id === comandaId ? { ...comanda, ...response.data } : comanda
        )
      );
      toast.success("Status da entrega atualizado!");
    } catch (err) {
      handleError(err, "Erro ao atualizar a entrega do pedido.");
    }
  };

  return (
    <CozinhaContext.Provider
      value={{
        cozinha,
        loading,
        error,
        adicionarComanda,
        atualizarStatusComanda,
        atualizarStatusEntrega,
      }}
    >
      {children}
    </CozinhaContext.Provider>
  );
};

export const useCozinha = () => {
  const context = useContext(CozinhaContext);
  if (!context) {
    throw new Error("useCozinha deve ser usado dentro de um CozinhaProvider");
  }
  return context;
};
