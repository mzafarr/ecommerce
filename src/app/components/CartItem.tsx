"use client";
import { ShopContext } from "@/context/ShopContext";
import React, { useContext } from "react";

export const CartItem = (props) => {
  const { id, name, price, img, quantity } = props.product;
  const { cartItems, setCartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);


  return (
    <div className="cartItem">
      <img src={img} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> Price: {price}</p>
        <div className="countHandler pt-4">
          <button 
            className="text-2xl rounded-lg w-10 h-10 inline-flex justify-center items-center bg-slate-800 text-white"
          
          onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            disabled
            className="border m-2 text-2xl rounded-lg w-10 h-10 text-center "
          />
          <button
            className="text-2xl rounded-lg w-10 h-10 inline-flex justify-center items-center bg-slate-800 text-white"
            onClick={() => {
              if (cartItems[id] < quantity) {
                addToCart(id);
              }
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
