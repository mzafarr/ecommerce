"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductPage = ({ params }: any) => {
  const id = params.id;
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const product = JSON.parse(localStorage.getItem(category))[id];
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  async function handleAddToCart() {
    await axios.post("/api/cart", {
      productId: id,
      quantity: selectedQuantity,
    });
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      const parsed = JSON.parse(cartItems);
      const newCart = [...parsed, { ...product, quantity: selectedQuantity }];
      localStorage.setItem("cartItems", JSON.stringify(newCart));
    } else {
      localStorage.setItem("cartItems", JSON.stringify([product]));
    }
    // dispatch(addToCart(product));
  }
  return (
    <div className="flex flex-col md:flex-row gap-24 justify-center items-center h-[80vh]">
      {/* <div className="border rounded-xl p-6"> */}
      <img
        className="md:w-96 w-64 max-w-[95vw]"
        src={`${product?.images[0].url}`}
        alt="iphone"
      />
      {/* </div> */}
      <div className="flex justify-between flex-col">
        <h3 className="mt-2 font-bold z-10 text-4xl">{product?.name}</h3>
        <div className="text-2xl py-2">{product?.description}</div>
        <p className="text-2xl font-semibold py-2 pb-2">$ {product?.price}</p>
        <div className="flex gap-4">
          <div>
            <button
              className="text-3xl rounded-lg w-12 h-12 inline-flex justify-center items-center bg-slate-800 text-white"
              onClick={() => {
                if (selectedQuantity < 2) {
                  setSelectedQuantity(selectedQuantity - 1);
                }
              }}
            >
              -{" "}
            </button>
            <input
              value={selectedQuantity}
              disabled
              className="border mx-3 text-3xl rounded-lg w-12 h-12 text-center "
            />
            <button
              className="text-3xl rounded-lg w-12 h-12 inline-flex justify-center items-center bg-slate-800 text-white"
              onClick={() => {
                if (product.quantity < selectedQuantity) {
                  setSelectedQuantity(selectedQuantity + 1);
                }
              }}
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="p-3 py-2 bg-yellow-400 rounded-md font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
