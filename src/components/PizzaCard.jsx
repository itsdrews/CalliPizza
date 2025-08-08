import React from 'react';

const PizzaCard = ({ pizza }) => {
   const ingredientesString = pizza.ingredientes.join(', ')
  return (
    <div className="pizza-card">
      <img  className='pizza-image' src='public/pizza-piece.svg'></img>
      <div className="pizza-header">
        <h2>{pizza.nome}</h2>
        <p className="pizza-ingredients">{ingredientesString}</p>
         <div className="pizza-footer">
        <div className="pizza-prices">
          {Object.entries(pizza.valores).map(([tamanho, valor],index) => (
            <div key={tamanho} className="price-item">
                <div className="inside-separator">
                {index > 0 && <div className="price-separator"></div>}
              <div className="size-price">
              <span className="size">{tamanho}:</span>
              <span className="price">R$ {valor.toFixed(2)}</span>
              <div className="cart-image-container">
               <span><img src="/carrinho.svg" alt="cart" className='cart-image' /></span>
              </div>
              </div>

                </div>
              </div>
              

              
        
          ))}
        </div>
      </div>
       
          </div>
    
     
    </div>
  );
};

export default PizzaCard;