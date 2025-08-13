import React from "react";
import PizzaCard from "../components/PizzaCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Cardapio = () => {
  const pizzas = [
    {
      id: 1,
      nome: "Margherita",
      descricao: "A clássica pizza italiana com ingredientes frescos",
      ingredientes: [
        "Molho de tomate",
        "Mussarela premium",
        "Manjericão fresco",
        "Azeite de oliva",
      ],
      valores: {
        Pequena: 35.9,
        Média: 45.9,
        Grande: 55.9,
        Família: 65.9,
      },
    },
    {
      id: 2,
      nome: "Calabresa",
      descricao: "Tradicional pizza brasileira com calabresa artesanal",
      ingredientes: [
        "Molho de tomate",
        "Mussarela",
        "Calabresa premium",
        "Cebola caramelizada",
      ],
      valores: {
        Pequena: 38.9,
        Média: 48.9,
        Grande: 58.9,
        Família: 68.9,
      },
    },
    {
      id: 3,
      nome: "Quatro Queijos",
      descricao: "Combinação perfeita de queijos selecionados",
      ingredientes: [
        "Molho de tomate",
        "Mussarela",
        "Provolone",
        "Gorgonzola",
        "Parmesão",
      ],
      valores: {
        Pequena: 42.9,
        Média: 52.9,
        Grande: 62.9,
        Família: 72.9,
      },
    },
    {
      id: 4,
      nome: "Portuguesa",
      descricao: "Sabor tradicional com ingredientes de qualidade",
      ingredientes: [
        "Molho de tomate",
        "Mussarela",
        "Presunto",
        "Ovos",
        "Cebola",
        "Azeitonas",
        "Pimentão",
      ],
      valores: {
        Pequena: 40.9,
        Média: 50.9,
        Grande: 60.9,
        Família: 70.9,
      },
    },
  ];

  return (
    <>
      <Header></Header>
      <div className="cardapio-container">
        <div className="pizzas-grid">
          {pizzas.slice(0, 3).map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} cardMode={"cardapio"} />
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Cardapio;
