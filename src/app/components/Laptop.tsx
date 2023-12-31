"use client";

import React, { useContext, useEffect, useState } from "react";
import Product from "./Product";
import { laptops } from "./data";
import Search from "./Search";
import Sort from "./Sort";

const Laptop = () => {
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const [filteredLaptops, setFilteredLaptops] = useState(laptops);
  const [sortOption, setSortOption] = useState("");


  function handleSearch() {
    switch (searchOption) {
      case "Name":
        setFilteredLaptops(
          laptops.filter((product) =>
            product.name.toLowerCase().includes(search)
          )
        );
        break;

      case "Description":
        setFilteredLaptops(
          laptops.filter((product) =>
            product.description.toLowerCase().includes(search)
          )
        );
        break;

      case "Price":
        setFilteredLaptops(
          laptops.filter((product) =>
            product.price.toLowerCase().includes(search)
          )
        );
        break;
    }
  }

  function compareByPriceAsc(a, b) {
    // Extract numerical values from the "price" strings and parse them as integers
    const priceA = parseInt(a.price.replace(/[^\d]/g, ""), 10);
    const priceB = parseInt(b.price.replace(/[^\d]/g, ""), 10);

    return priceA - priceB;
  }
  function compareByPriceDesc(a, b) {
    const priceA = parseInt(a.price.replace(/[^\d]/g, ""), 10);
    const priceB = parseInt(b.price.replace(/[^\d]/g, ""), 10);

    return priceB - priceA;
  }
  function handleSort() {
    if (sortOption == "A") {
      filteredLaptops.sort(compareByPriceAsc);
    } else if (sortOption == "D") {
      filteredLaptops.sort(compareByPriceDesc);
    }
  }
  if (sortOption != "") {
    handleSort();
  }

  useEffect(() => {
    handleSearch();
  }, [search, searchOption]);
  return (
    <div className="px-4 py-6 pb-20">
      <h1 className="text-6xl font-semibold text-center py-6">Laptops</h1>
      <div className="flex justify-center py-4">
        <Search
          search={search}
          setSearch={setSearch}
          searchOption={searchOption}
          setSearchOption={setSearchOption}
        />
        <Sort sortOption={sortOption} setSortOption={setSortOption} />
      </div>
      <div className="flex flex-wrap">
        {filteredLaptops.map((laptop, index) => (
          <Product
            name={laptop.name}
            description={laptop.description}
            image={laptop.img}
            price={laptop.price}
            key={laptop.id}
            id={laptop.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Laptop;
