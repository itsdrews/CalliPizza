import React from 'react';

const PizzaCard = ({ pizza }) => {
   const ingredientesString = pizza.ingredientes.join(', ')
  return (
    <div className="pizza-card">
      <img  className='pizza-image' src='public/pizza-piece.svg'></img>
      <div className="pizza-header">
        <h3>{pizza.nome}</h3>
        <p className="pizza-ingredients">{ingredientesString}</p>
  
          </div>
         <div className="pizza-footer">
        <div className="pizza-prices">
          {Object.entries(pizza.valores).map(([tamanho, valor]) => (
            <div key={tamanho} className="price-item">
              <span className="size">{tamanho}:</span>
              <span className="price">R$ {valor.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
       
    
     
    </div>
  );
};

export default PizzaCard;