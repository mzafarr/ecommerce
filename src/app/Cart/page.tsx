"use client";
import { ShopContext } from "@/context/ShopContext";
import React, { useContext, useEffect } from "react";
import { products } from "../components/data";
import { CartItem } from "../components/CartItem";

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Cart = () => {
  const { cartItems, setCartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();  

  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);
// Save cart items to local storage whenever it changes
useEffect(() => {

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);

  return (
    <div className="cart min-h-[60vh]">
      <div>
        <h1 className="text-4xl font-semibold py-6">Your Cart Items</h1>
      </div>
      <div className="cart">
        {products.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem product={product} key={product.id} />;
          }
        })}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout pb-20">
          <p className="text-2xl py-6 pb-3"><b> Subtotal:</b> Rs. {numberWithCommas(totalAmount)} </p>
          {/* <button onClick={() => navigate("/")}> Continue Shopping </button> */}
          <button
            onClick={() => {
              checkout();
              alert("order confirmed")
              // navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1 className="text-3xl font-normal py-6 pb-3"> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};

export default Cart;
