"use client"
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { ShopContext } from "@/context/ShopContext";

const Product = ({ name, price, description, image, id }) => {
  const { cartItems, addToCart } = useContext(ShopContext);

// Save cart items to local storage whenever it changes
useEffect(() => {

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);

  return (
    <div className="flex justify-between flex-col w-[300px] border px-6 py-3 rounded-xl m-4 ">
      <img className="w-44 mx-auto" src={image} alt="iphone" />
      <>
        <div className="flex justify-center flex-col">
          <Link href={`/Product/${id}`}>
            <h3 className="text-xl mt-2 font-bold z-10">{name}</h3>
          </Link>
          <div className="">{description}</div>
          <p className="font-semibold py-2 text-lg">{price}</p>
        </div>
        <button
          className="p-3 bg-yellow-400 rounded-md "
          onClick={() => addToCart(id)}
        >
          Add to Cart {cartItems[id]>0 ? `(${cartItems[id]})` : ""}
        </button>
      </>
    </div>
  );
};

export default Product;
