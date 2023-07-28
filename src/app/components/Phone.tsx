"use client";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import { phones } from "./data";
import Search from "./Search";
import Sort from "./Sort";

const Phone = () => {
  const [search, setSearch] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const [filteredPhones, setFilteredPhones] = useState(phones);
  const [sortOption, setSortOption] = useState("");

  function handleSearch() {
    switch (searchOption) {
      case "Name":
        setFilteredPhones(
          phones.filter((product) =>
            product.name.toLowerCase().includes(search)
          )
        );
        break;

      case "Description":
        setFilteredPhones(
          phones.filter((product) =>
            product.description.toLowerCase().includes(search)
          )
        );
        break;

      case "Price":
        setFilteredPhones(
          phones.filter((product) =>
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

    return priceA - priceB;
  }
  function handleSort() {
    if (sortOption == "A") {
      filteredPhones.sort(compareByPriceAsc);
    } else if (sortOption == "D") {
        filteredPhones.sort(compareByPriceDesc);
    }
  }
  useEffect(() => {
    handleSort();
  }, [sortOption]);


  useEffect(() => {
    handleSearch();
  }, [search, searchOption, sortOption]);

  return (
    <div className="px-4">
      <h1 className="text-4xl font-semibold py-4 text-center">Phones</h1>
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
        {filteredPhones.map((phone, index) => (
          <Product
            name={phone.name}
            description={phone.description}
            price={phone.price}
            image={phone.img}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Phone;
