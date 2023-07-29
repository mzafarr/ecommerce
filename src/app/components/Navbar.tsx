import Link from "next/link";
import React, { useState } from "react";
import { products } from "./data";

const Navbar = () => {

  function handleSearch(search) {
    products.filter(
      (product) =>
        product.name.includes(search) ||
        product.description.includes(search) ||
        product.price.includes(search)
    );
  }
  return (
    <nav className=" flex items-center gap-8 text-xl justify-between p-4 px-16 bg-gray-900 text-white">
      <Link href={`/`}>
        <h3>TechArena</h3>
      </Link>
      <div className="flex items-center gap-8">
        {/* <input
          type="text"
          name="search"
          placeholder="search for a product..."
          value={search}
          className="px-2 mx-4 rounded border-lg text-base py-1.5 bg-slate-600 outline-none"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        /> */}
        <Link href={`/Laptops`}>
          <h3>Laptops</h3>
        </Link>
        <Link href={`/Phones`}>
          <h3>Phones</h3>
        </Link>
        <Link href={`/Cart`}>
          <h3>Cart</h3>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
