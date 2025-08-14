import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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
  tipo: Yup.string()
    .required("Tipo é obrigatório")
    .matches(
      /^[a-zA-Z\s]*$/,
      "O tipo não pode conter caracteres especiais ou números."
    ),
  ingredientes: Yup.string().required("Ingredientes são obrigatórios"),
  valor_p: Yup.number()
    .required("O valor (P) é obrigatório")
    .typeError("O valor (P) deve ser um número"),
  valor_m: Yup.number()
    .required("O valor (M) é obrigatório")
    .typeError("O valor (M) deve ser um número"),
  valor_g: Yup.number()
    .required("O valor (G) é obrigatório")
    .typeError("O valor (G) deve ser um número"),
  valor_f: Yup.number()
    .required("O valor (F) é obrigatório")
    .typeError("O valor (F) deve ser um número"),
});

const CadastrarPizza = ({ pizza, inserirPizza, editarPizza }) => {
  const navigate = useNavigate();

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
      valor_p: pizza?.valor_p || "",
      valor_m: pizza?.valor_m || "",
      valor_g: pizza?.valor_g || "",
      valor_f: pizza?.valor_f || "",
    },
  });

  const onSubmit = (dados) => {
    const pizzaComId = { ...dados, id: pizza?.id };

    if (pizza?.id && editarPizza) {
      editarPizza(pizzaComId); // Corrigido de editarLivro para editarPizza
      toast.success("Pizza atualizada com sucesso!");
    } else if (inserirPizza) {
      inserirPizza(pizzaComId); // Corrigido de inserirLivro para inserirPizza
      toast.success("Pizza cadastrada com sucesso!");
    }

    // Redireciona após 1.5s
    setTimeout(() => navigate("/admin"), 1500);
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
            className={errors.valor_p ? "erro" : ""}
            {...register("valor_p")}
          />
          {errors.valor_p && (
            <span className="mensagem-erro">{errors.valor_p.message}</span>
          )}
        </p>

        <p>
          <label htmlFor="fvalorm">Valor (Média)</label>
          <input
            id="fvalorm"
            type="number"
            className={errors.valor_m ? "erro" : ""}
            {...register("valor_m")}
          />
          {errors.valor_m && (
            <span className="mensagem-erro">{errors.valor_m.message}</span>
          )}
        </p>

        <p>
          <label htmlFor="fvalorg">Valor (Grande)</label>
          <input
            id="fvalorg"
            type="number"
            className={errors.valor_g ? "erro" : ""}
            {...register("valor_g")}
          />
          {errors.valor_g && (
            <span className="mensagem-erro">{errors.valor_g.message}</span>
          )}
        </p>

        <p>
          <label htmlFor="fvalorf">Valor (Família)</label>
          <input
            id="fvalorf"
            type="number"
            className={errors.valor_f ? "erro" : ""}
            {...register("valor_f")}
          />
          {errors.valor_f && (
            <span className="mensagem-erro">{errors.valor_f.message}</span>
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

export default CadastrarPizza;
