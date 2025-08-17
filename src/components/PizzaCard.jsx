import React, { useEffect, useState } from "react";


const PizzaCard = ({ pizza, cardMode,onIncrease,onDecrease,deletePizza,adicionarPedido }) => {
  const ingredientesString = pizza.ingredientes;
   const handleIncrease = () => {
    onIncrease(pizza.id,pizza.tamanho);
  };

  const handleDecrease = () => {
    onDecrease(pizza.id,pizza.tamanho);
  };
  const handleDelete = () => {
    deletePizza(pizza.id,pizza.tamanho);
  }
  const renderCardContent = () => {
    switch (cardMode) {
      case "cardapio":
        return (
          <div className="pizza-card">
            <img className="pizza-image" src="/pizza-piece.svg"></img>

            <div className="pizza-info">
              <div className="pizza-header">
                <h2>{pizza.nome}</h2>
              </div>
              <p className="pizza-ingredients">{ingredientesString}</p>
              <div className="pizza-footer">
                {Object.entries(pizza.valores).map(
                  ([tamanho, valor], index) => (
                    <div key={tamanho} className="price-item">
                      {index > 0 && <div className="price-separator"></div>}
                      <div className="size-price">
                        <span className="size">{tamanho}:</span>
                        <span className="price">R$ {valor.toFixed(2)}</span>

                        <div className="cart-image-container">
                          <span>
                            <img
                              onClick={() =>adicionarPedido(pizza.id,pizza.nome,tamanho,valor)}
                              src="/carrinho.svg"
                              alt="cart"
                              className="cart-image"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        );

      case "comanda":
        return (
          <div className="pizza-card">
            <div className="pizza-quantity-container">
              <h1 className="pizza-quantity">{pizza.quantidade}x</h1>
            </div>

            <div className="pizza-info">
              <div className="pizza-header">
                <h2>
                  {pizza.nome} - {pizza.tamanho}
                </h2>
                <p className="pizza-ingredients-comanda">
                  {ingredientesString}
                </p>
              </div>
            </div>
            <div className="pizza-footer-comanda">
              <div className="price-item-comanda">
                <span className="price-comanda">
                  R$ {pizza.valor.toFixed(2)}
                </span>

                <button 
                className="quantity-button"
                onClick = {handleIncrease}
                >+</button>
                <button
                 className="quantity-button"
                 onClick={handleDecrease}
                 >-</button>
                <button className="delete-button"
                onClick={handleDelete}>
                  <img
                    className="delete-button-image"
                    src="/thrash-can.svg"
                    alt=""
                  />{" "}
                </button>
              </div>
            </div>
          </div>
        );
    }
  };
  return <div className={`pizza-card ${cardMode}`}>{renderCardContent()}</div>;
};

export default PizzaCard;
