import React, { createContext, useState, useContext } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const FuncionarioContext = createContext();
const API_URL = "http://localhost:3001/funcionario";

export const FuncionarioProvider = ({ children }) => {
  const [funcionario, setFuncionario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cargos = ["garcom", "entregador"];

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get(API_URL);
        setFuncionario(response.data);
      } catch (err) {
        setError(err.message);
        toast.error(
          "Falha ao carregar os funcionários. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchFuncionarios();
  }, []);

  //---CRUD---
  // CREATE
  const inserirFuncionario = async (novoFuncionario) => {
    try {
      const funcionarioFormatado = {
        cpf: novoFuncionario.cpf,
        nome: novoFuncionario.nome,
        convenio: novoFuncionario.convenio,
        cargo: novoFuncionario.cargo,
      };

      const response = await axios.post(API_URL, funcionarioFormatado);
      setFuncionario((prevFunc) => [...prevFunc, response.data]);
      toast.success("Funcionario cadastrado com sucesso!");
    } catch (err) {
      setError(err.message);
      toast.error("Erro ao cadastrar a funcionário.");
    }
  };

  // UPDATE
  const editarFuncionario = async (funcionarioEditado) => {
    try {
      const funcionarioFormatado = {
        cpf: funcionarioEditado.cpf,
        nome: funcionarioEditado.nome,
        convenio: funcionarioEditado.convenio,
        cargo: funcionarioEditado.cargo,
      };

      const response = await axios.put(
        `${API_URL}/${funcionarioEditado.id}`,
        funcionarioEditado
      );
      setFuncionario((prevFunc) =>
        prevFunc.map((funcionario) =>
          funcionario.id === response.data.id ? response.data : funcionario
        )
      );
      toast.success("Funcionário atualizado com sucesso!");
    } catch (err) {
      setError(err.message);
      toast.error("Erro ao atualizar a funcionário.");
    }
  };

  // DELETAR
  const removerFuncionario = async (id) => {
    if (window.confirm("Confirma a exclusão de funcionário?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setFuncionario((prevFunc) =>
          prevFunc.filter((funcionario) => funcionario.id !== id)
        );
        toast.info("Funcionário excluído com sucesso!");
      } catch (err) {
        setError(err.message);
        toast.error("Erro ao excluir a funcionário.");
      }
    }
  };

  const value = {
    funcionario,
    setFuncionario,
    cargos,
    loading,
    error,
    inserirFuncionario,
    editarFuncionario,
    removerFuncionario,
  };

  return (
    <FuncionarioContext.Provider value={value}>
      {children}
    </FuncionarioContext.Provider>
  );
};

export const useFuncionario = () => {
  const context = useContext(FuncionarioContext);
  if (!context) {
    throw new Error(
      "useFuncionario deve ser usado dentro de um FuncionarioProvider"
    );
  }
  return context;
};
