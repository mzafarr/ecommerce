"use client";
// import userSlice from "@/lib/redux/userSlice";
// import { useDispatch } from "react-redux";
// import { addToCart } from "@/lib/redux/userSlice";
import axios from "axios";
import Link from "next/link";

const Product = ({ product, category }) => {
  const { name, price, description, image, id } = product;
  // const dispatch = useDispatch();

  async function handleAddToCart() {
    await axios.post("/api/cart", {
      productId: id,
      quantity: 1,
    });
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      const parsed = JSON.parse(cartItems);
      const newCart = [...parsed, product];
      localStorage.setItem("cartItems", JSON.stringify(newCart));
    } else {
      localStorage.setItem("cartItems", JSON.stringify([product]));
    }
    // dispatch(addToCart(product));
  }

  return (
    <>
      <div className="flex justify-between flex-col w-[300px] border px-6 py-3 rounded-xl m-4 ">
        <img className="w-44 mx-auto" src={"/img/iphone14.jpeg"} alt={name} />
        <>
          <div className="flex justify-center flex-col">
            <Link href={`/product/${id}&category=${category}`}>
              <h3 className="text-xl mt-2 font-bold z-10">{name}</h3>
            </Link>
            <div className="">{description}</div>
            <p className="font-semibold py-2 text-lg">$ {price}</p>
          </div>
          <button
            className="p-3 bg-yellow-400 rounded-md "
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </>
      </div>
    </>
  );
};

export default Product;
