import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
// Nota: os arquivos CSS destas bibliotecas devem ser importados globalmente no seu projeto.

// Esquema de validação com Yup atualizado para a nova estrutura
const schema = Yup.object().shape({
  nome: Yup.string().required("Sabor é obrigatório"),
  tipo: Yup.string()
    .required("Tipo é obrigatório")
    .matches(
      /^[a-zA-Z\s]*$/,
      "O tipo não pode conter caracteres especiais ou números."
    ),
  ingredientes: Yup.string().required("Ingredientes são obrigatórios"),
  // Nova estrutura de validação para o objeto 'valores'
  valores: Yup.object().shape({
    pequena: Yup.number()
      .required("O valor (Pequena) é obrigatório")
      .typeError("O valor (Pequena) deve ser um número"),
    media: Yup.number()
      .required("O valor (Média) é obrigatório")
      .typeError("O valor (Média) deve ser um número"),
    grande: Yup.number()
      .required("O valor (Grande) é obrigatório")
      .typeError("O valor (Grande) deve ser um número"),
    familia: Yup.number()
      .required("O valor (Família) é obrigatório")
      .typeError("O valor (Família) deve ser um número"),
  }),
});

const AddPizza = ({ pizza, cadastrarPizza, editarPizza }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    // Valores padrão atualizados para a nova estrutura
    defaultValues: {
      nome: pizza?.nome || "",
      tipo: pizza?.tipo || "",
      ingredientes: pizza?.ingredientes || "",
      valores: {
        pequena: pizza?.valores?.pequena || "",
        media: pizza?.valores?.media || "",
        grande: pizza?.valores?.grande || "",
        familia: pizza?.valores?.familia || "",
      },
    },
  });

  const onSubmit = async (dados) => {
    const pizzaComId = { ...dados, id: pizza?.id };
    try {
      if (pizza?.id) {
        await editarPizza(pizzaComId);
        toast.success("Pizza atualizada com sucesso!");
      } else {
        await cadastrarPizza(pizzaComId);
        toast.success("Pizza cadastrada com sucesso!");
      }

      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar a pizza.");
      console.error("Erro ao salvar a pizza:", error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful && !pizza?.id) {
      reset();
    }
  }, [isSubmitSuccessful, reset, pizza]);

  const handleCancelar = () => {
    navigate("/admin");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <form onSubmit={handleSubmit(onSubmit)} className="meu-formulario">
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
          <input
            id="ftipo"
            className={errors.tipo ? "erro" : ""}
            {...register("tipo")}
          />
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
            type="number"
            className={errors.valores?.pequena ? "erro" : ""}
            {...register("valores.pequena")}
          />
          {errors.valores?.pequena && (
            <span className="mensagem-erro">
              {errors.valores.pequena.message}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="fvalorm">Valor (Média)</label>
          <input
            id="fvalorm"
            type="number"
            className={errors.valores?.media ? "erro" : ""}
            {...register("valores.media")}
          />
          {errors.valores?.media && (
            <span className="mensagem-erro">
              {errors.valores.media.message}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="fvalorg">Valor (Grande)</label>
          <input
            id="fvalorg"
            type="number"
            className={errors.valores?.grande ? "erro" : ""}
            {...register("valores.grande")}
          />
          {errors.valores?.grande && (
            <span className="mensagem-erro">
              {errors.valores.grande.message}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="fvalorf">Valor (Família)</label>
          <input
            id="fvalorf"
            type="number"
            className={errors.valores?.familia ? "erro" : ""}
            {...register("valores.familia")}
          />
          {errors.valores?.familia && (
            <span className="mensagem-erro">
              {errors.valores.familia.message}
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
          <Tooltip id="tooltip-cadastrar" place="top" />
          <Tooltip id="tooltip-limpar" place="top" />
          <Tooltip id="tooltip-cancelar" place="top" />
        </div>
      </form>
    </>
  );
};

export default AddPizza;
