"use client";
import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, removeFromCart, setCartItems } from "@/lib/redux/userSlice";
import { numberWithCommas } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

export const CartItem = (props) => {
  console.log(props);
  const {
    id,
    productId,
    userId,
    quantity,
    name = "",
    description = "",
    price = "",
    images = "",
    category = "",
  } = props.cartItem;

  const [quantityState, setQuantityState] = useState(quantity);
  let products = [];
  //@ts-ignore
  // const products = useSelector((state) => state.user.products);
  // const dispatch = useDispatch();

  useEffect(() => {
    products = JSON.parse(localStorage.getItem("products"));
  }, []);

  const handler = async (isIncreaseQuantity: boolean) => {
    const newQuantity = isIncreaseQuantity ? quantity + 1 : quantity - 1;
    setQuantityState(newQuantity);
    const cartItems = localStorage.getItem("cartItems");
    if (isIncreaseQuantity) {
      const newCart = [...JSON.parse(cartItems), { ...props.cartItem }];
      localStorage.setItem("cartItems", JSON.stringify(newCart));
    } else {
      const newCart = JSON.parse(cartItems).filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(newCart));
    }
    await axios.post("/api/cart", {
      productId: id,
      newQuantity,
    });
  };
  return (
    <div className="max-w-full mx-auto rounded-lg m-4 border p-4 text-black flex items-center gap-6">
      <div className="relative aspect-square h-24 w-24 min-w-fit overflow-hidden rounded">
        <Image
          src={`${images[0]?.url || "/img/iphone14.jpeg"}`}
          // className="mx-auto"
          fill
          alt="product image"
        />
      </div>

      {/* <Image src={images[0]} width={150} alt="product image"/> */}
      <div className="flex flex-col mx-auto justify-center gap-2">
        <div>
          <b className="text-xl">{name}</b>
          <p className="text-md">{description}</p>
          <p className="text-md font-semibold">
            {" "}
            Price: {numberWithCommas(price)}
          </p>
        </div>
        <div>
          <button
            className="text-2xl rounded-lg w-8 h-8 inline-flex justify-center items-center bg-slate-800 text-white"
            // onClick={() => dispatch(removeFromCart(product))}
            onClick={() => handler(false)}
          >
            -{" "}
          </button>
          <input
            value={quantityState}
            disabled
            className="border m-2 text-2xl rounded-lg w-8 h-8 text-center "
          />
          <button
            className="text-2xl rounded-lg w-8 h-8 inline-flex justify-center items-center bg-slate-800 text-white"
            onClick={() => {
              // if (products[category].quantity < quantity) {
              handler(true);
              // }
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
