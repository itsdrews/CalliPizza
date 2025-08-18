import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePizzas } from "../context/PizzaContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// Esquema de validação com Yup
const schema = Yup.object().shape({
  nome: Yup.string().required("Sabor é obrigatório"),
  tipo: Yup.string().required("Tipo é obrigatório"), // Expressão regular removida para flexibilidade
  ingredientes: Yup.string().required("Ingredientes são obrigatórios"),
  valores: Yup.object().shape({
    Pequena: Yup.number()
      .typeError("Valor (P) deve ser um número")
      .required("O valor (P) é obrigatório"),
    Média: Yup.number()
      .typeError("Valor (M) deve ser um número")
      .required("O valor (M) é obrigatório"),
    Grande: Yup.number()
      .typeError("Valor (G) deve ser um número")
      .required("O valor (G) é obrigatório"),
    Família: Yup.number()
      .typeError("Valor (F) deve ser um número")
      .required("O valor (F) é obrigatório"),
  }),
});

const AddPizza = ({ idpizza }) => {
  const navigate = useNavigate();

  const { pizzas, inserirPizza, categorias, editarPizza } = usePizzas();

  const pizza = idpizza ? pizzas.find((p) => p.id === idpizza) : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: pizza?.nome || "",
      tipo: pizza?.tipo || "",
      ingredientes: pizza?.ingredientes || "",
      valores: {
        Pequena: pizza?.valores?.Pequena || "",
        Média: pizza?.valores?.Média || "",
        Grande: pizza?.valores?.Grande || "",
        Família: pizza?.valores?.Família || "",
      },
    },
  });

  const onSubmit = async (dados) => {
    try {
      if (pizza?.id) {
        await editarPizza({ ...dados, id: pizza.id });
      } else {
        await inserirPizza(dados);
      }

      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  useEffect(() => {
    if (pizza) {
      reset({
        nome: pizza.nome,
        tipo: pizza.tipo,
        ingredientes: pizza.ingredientes,
        valores: {
          Pequena: pizza.valores.Pequena,
          Média: pizza.valores.Média,
          Grande: pizza.valores.Grande,
          Família: pizza.valores.Família,
        },
      });
    } else if (idpizza) {
      navigate("/admin");
    }
  }, [idpizza, pizzas, reset, navigate]);

  useEffect(() => {
    if (isSubmitSuccessful && !idpizza) {
      reset();
    }
  }, [isSubmitSuccessful, reset, pizza]);

  const handleCancelar = () => {
    navigate("/admin");
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
        <h1>{pizza?.id ? "Editar" : "Cadastrar"} pizza</h1>

        <p>
          <label htmlFor="fnome">
            Sabor: (<span style={{ color: "red" }}>*</span>)
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
          <label htmlFor="ftipo">Tipo</label>
          <select
            id="ftipo"
            className={errors.tipo ? "erro" : ""}
            {...register("tipo")}
          >
            <option value="">Selecione...</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
          {errors.tipo && (
            <span className="mensagem-erro">{errors.tipo.message}</span>
          )}
        </p>

        <p>
          <label htmlFor="fingredientes">Ingredientes</label>
          <input
            id="fingredientes"
            className={errors.ingredientes ? "erro" : ""}
            {...register("ingredientes")}
          />
          {errors.ingredientes && (
            <span className="mensagem-erro">{errors.ingredientes.message}</span>
          )}
        </p>

        <p>
          <label htmlFor="fvalorp">Valor (Pequena)</label>
          <input
            id="fvalorp"
            type="text"
            className={errors.valores?.Pequena ? "erro" : ""}
            {...register("valores.Pequena")}
          />
          {errors.valores?.Pequena && (
            <span className="mensagem-erro">
              {errors.valores.Pequena.message}
            </span>
          )}
        </p>

        <p>
          <label htmlFor="fvalorm">Valor (Média)</label>
          <input
            id="fvalorm"
            type="text"
            className={errors.valores?.Média ? "erro" : ""}
            {...register("valores.Média")}
          />
          {errors.valores?.Média && (
            <span className="mensagem-erro">
              {errors.valores.Média.message}
            </span>
          )}
        </p>

        <p>
          <label htmlFor="fvalorg">Valor (Grande)</label>
          <input
            id="fvalorg"
            type="text"
            className={errors.valores?.Grande ? "erro" : ""}
            {...register("valores.Grande")}
          />
          {errors.valores?.Grande && (
            <span className="mensagem-erro">
              {errors.valores.Grande.message}
            </span>
          )}
        </p>

        <p>
          <label htmlFor="fvalorf">Valor (Família)</label>
          <input
            id="fvalorf"
            type="text"
            className={errors.valores?.Família ? "erro" : ""}
            {...register("valores.Família")}
          />
          {errors.valores?.Família && (
            <span className="mensagem-erro">
              {errors.valores.Família.message}
            </span>
          )}
        </p>

        <div className="botoes-formulario">
          <button
            type="submit"
            className="botao cadastrar"
            data-tooltip-id="tooltip-cadastrar"
            data-tooltip-content={
              pizza?.id
                ? "Salvar alterações desta pizza"
                : "Cadastrar nova pizza"
            }
          >
            {pizza?.id ? "Salvar" : "Cadastrar"}
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

export default AddPizza;
