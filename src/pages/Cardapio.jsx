import React from 'react';
import PizzaCard from '../components/PizzaCard';


const Cardapio = () => {
  const pizzas = [
    {
      id: 1,
      nome: "Margherita",
      descricao: "A clássica pizza italiana com ingredientes frescos",
      ingredientes: ["Molho de tomate", "Mussarela premium", "Manjericão fresco", "Azeite de oliva"],
      valores: {
        "P": 35.90,
        "M": 45.90,
        "G": 55.90,
        "Família": 65.90
      }
    },
    {
      id: 2,
      nome: "Calabresa",
      descricao: "Tradicional pizza brasileira com calabresa artesanal",
      ingredientes: ["Molho de tomate", "Mussarela", "Calabresa premium", "Cebola caramelizada"],
      valores: {
        "P": 38.90,
        "M": 48.90,
        "G": 58.90,
        "Família": 68.90
      }
    },
    {
      id: 3,
      nome: "Quatro Queijos",
      descricao: "Combinação perfeita de queijos selecionados",
      ingredientes: ["Molho de tomate", "Mussarela", "Provolone", "Gorgonzola", "Parmesão"],
      valores: {
        "P": 42.90,
        "M": 52.90,
        "G": 62.90,
        "Família": 72.90
      }
    },
    {
      id: 4,
      nome: "Portuguesa",
      descricao: "Sabor tradicional com ingredientes de qualidade",
      ingredientes: ["Molho de tomate", "Mussarela", "Presunto", "Ovos", "Cebola", "Azeitonas", "Pimentão"],
      valores: {
        "P": 40.90,
        "M": 50.90,
        "G": 60.90,
        "Família": 70.90
      }
    }
  ];

  return (
    <div className="cardapio-container">      
      <div className="pizzas-grid">
        {pizzas.slice(0,3).map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
      
    
    </div>
  );
};

export default Cardapio;