import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useFuncionario } from "../context/FuncionarioContext";

// Esquema de validação com Yup
const schema = Yup.object().shape({
  cpf: Yup.string().required("CPF é obrigatório"),
  nome: Yup.string().required("Nome é obrigatório"),
  convenio: Yup.string(),
  cargo: Yup.string().required("Cargo é obrigatório"),
});

const AddFunc = ({ idfunc }) => {
  const navigate = useNavigate();

  const { funcionario, inserirFuncionario, cargos, editarFuncionario } =
    useFuncionario();

  const func = idfunc ? funcionario.find((f) => f.id === idfunc) : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      cpf: func?.cpf || "",
      nome: func?.nome || "",
      convenio: func?.convenio || "",
      cargo: func?.cargo || "",
    },
  });

  const onSubmit = async (dados) => {
    try {
      if (func?.id) {
        await editarFuncionario({ ...dados, id: func.id });
      } else {
        await inserirFuncionario(dados);
      }

      setTimeout(() => navigate("/func-adm"), 1500);
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  useEffect(() => {
    if (func) {
      reset({
        cpf: func.cpf,
        nome: func.nome,
        cargo: func.cargo,
        convenio: func.convenio,
      });
    } else if (idfunc) {
      navigate("/func-adm");
    }
  }, [idfunc, funcionario, reset, navigate]);

  useEffect(() => {
    if (isSubmitSuccessful && !idfunc) {
      reset();
    }
  }, [isSubmitSuccessful, reset, func]);

  const handleCancelar = () => {
    navigate("/func-adm");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="meu-formulario"
        style={{
          fontSize: "2.4rem",
          width: "70%",
          margin: "0 auto",
        }}
      >
        <h1>{func?.id ? "Editar" : "Cadastrar"} funcionário</h1>

        <p>
          <label htmlFor="fcpf">
            CPF: (<span style={{ color: "red" }}>*</span>)
          </label>
          <input
            id="fcpf"
            className={errors.cpf ? "erro" : ""}
            autoFocus
            {...register("cpf")}
          />

          {errors.nome && (
            <span className="mensagem-erro">{errors.nome.message}</span>
          )}
        </p>

        <p>
          <label htmlFor="fnome">
            Nome: (<span style={{ color: "red" }}>*</span>)
          </label>
          <input
            id="fnome"
            className={errors.nome ? "erro" : ""}
            autoFocus
            {...register("nome")}
          />
          {errors.nome && (
            <span className="mensagem-erro">{errors.nome.message}</span>
          )}
        </p>

        <p>
          <label htmlFor="fconvenio">Convênio:</label>
          <input
            id="fconvenio"
            className={errors.convenio ? "erro" : ""}
            autoFocus
            {...register("convenio")}
          />
          {errors.nome && (
            <span className="mensagem-erro">{errors.nome.message}</span>
          )}
        </p>

        <p>
          <label htmlFor="ftipo">Cargo</label>
          <select
            id="ftipo"
            className={errors.cargo ? "erro" : ""}
            {...register("cargo")}
          >
            <option value="">Selecione...</option>
            {cargos.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
          {errors.cargo && (
            <span className="mensagem-erro">{errors.cargo.message}</span>
          )}
        </p>

        <div className="botoes-formulario">
          <button
            type="submit"
            className="botao cadastrar"
            data-tooltip-id="tooltip-cadastrar"
            data-tooltip-content={
              func?.id
                ? "Salvar alterações deste funcionário"
                : "Cadastrar novo funcionário"
            }
          >
            {func?.id ? "Salvar" : "Cadastrar"}
          </button>

          <button
            type="button"
            className="botao limpar"
            data-tooltip-id="tooltip-limpar"
            data-tooltip-content="Limpa todos os campos do formulário"
            onClick={() => reset()}
          >
            Limpar
          </button>

          <button
            type="button"
            className="botao cancelar"
            data-tooltip-id="tooltip-cancelar"
            data-tooltip-content="Cancelar e voltar à página inicial"
            onClick={handleCancelar}
          >
            Cancelar
          </button>

          {/* Tooltips associadas por ID */}
          <Tooltip id="tooltip-cadastrar" place="top" />
          <Tooltip id="tooltip-limpar" place="top" />
          <Tooltip id="tooltip-cancelar" place="top" />
        </div>
      </form>
    </>
  );
};

export default AddFunc;
