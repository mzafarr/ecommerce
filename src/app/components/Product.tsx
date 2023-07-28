import React from "react";

const Product = ({ name, price, description, image }) => {
  return (
    <div className="flex justify-between flex-col w-[300px] border px-6 py-3 rounded-xl m-4 ">
      <img className="w-44 mx-auto" src={image} alt="iphone" />
      <>
        <div className="flex justify-center flex-col">
          <h3 className="text-xl mt-2 font-bold z-10">{name}</h3>
          <div className="">{description}</div>
          <p className="font-semibold py-2 text-lg">{price}</p>
        </div>
        <button className="p-3 bg-yellow-400 rounded-md ">Add to Cart</button>
      </>
    </div>
  );
};

export default Product;
