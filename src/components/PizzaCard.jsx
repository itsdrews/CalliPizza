import React from 'react';

const PizzaCard = ({ pizza }) => {
   const ingredientesString = pizza.ingredientes.join(', ')
  return (
    <div className="pizza-card">
      <img  className='pizza-image' src='/pizza-piece.svg'></img>

      <div className="pizza-info">

      <div className="pizza-header">
        <h2>{pizza.nome}</h2>
          </div>
        <p className="pizza-ingredients">{ingredientesString}</p>
         <div className="pizza-footer">
          {Object.entries(pizza.valores).map(([tamanho, valor],index) => (
            <div key={tamanho} className="price-item">
            {index > 0 && <div className="price-separator"></div>}
               <div className="size-price">

              <span className="size">{tamanho}:</span>
              <span className="price">R$ {valor.toFixed(2)}</span>

              <div className="cart-image-container">
               <span><img src="/carrinho.svg" alt="cart" className='cart-image' /></span>
              </div>

               </div>
                </div>
              
        
          ))}
       
      </div>
      </div>
       
    
     
    </div>
  );
};

export default PizzaCard;