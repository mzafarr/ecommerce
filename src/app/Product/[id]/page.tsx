"use client";
import { products } from "@/app/components/data";
import React, { useState } from "react";

const Product = ({ params }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const product = products.find((product) => product.id == params.id);

  return (
    <div className="flex gap-24 justify-center items-center h-[80vh]">
      {/* <div className="border rounded-xl p-6"> */}
        <img className="w-96" src={product.img} alt="iphone" />
      {/* </div> */}
      <div className="flex justify-between flex-col">
        <h3 className="mt-2 font-bold z-10 text-4xl">{product.name}</h3>
        <div className="text-2xl py-2">{product.description}</div>
        <p className="text-2xl font-semibold py-2 pb-2">{product.price}</p>
        <div className="flex gap-4">
          <input
            type="number"
            min={1}
            max={product.quantity}
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
            className="flex w-20 border border-slate-300 pl-3 pr-2  rounded-lg outline-none"
          />
          <button className="p-3 py-2 bg-yellow-400 rounded-md ">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
