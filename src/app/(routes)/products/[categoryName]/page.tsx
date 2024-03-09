"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "@/components/Common/Search";
import Sort from "@/components/Common/Sort";
import Product from "@/components/Common/Product";
import { useParams } from "next/navigation";
import { ProductSkeleton } from "@/components/Common/ProductSkeleton";

const ProductPage = () => {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const params = useParams<{ categoryName: string }>();

  async function getProductsFromDB(categoryName) {
    try {
      const res = await axios.get("/api/products", {
        params: {
          searchQuery: search,
          category: categoryName,
        },
      });
      const products = res.data.products;
      setFilteredProducts(products);
      localStorage.setItem(categoryName, JSON.stringify(products));
    } catch (error) {
      console.error("Error fetching products from the database:", error);
    }
  }

  useEffect(() => {
    if (params?.categoryName) {
      const storedData = localStorage.getItem(params.categoryName);
      const parsedData = JSON.parse(storedData);

      if (!storedData || parsedData?.length === 0) {
        getProductsFromDB(params?.categoryName);
      } else {
        setFilteredProducts(parsedData);
      }
    }
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search, sortOption]);

  function handleSearch() {
    setFilteredProducts(
      filteredProducts?.filter((product: any) =>
        product.name.toLowerCase().includes(search)
      )
    );
  }

  function handleSort() {
    if (sortOption == "A") {
      filteredProducts?.sort();
    } else if (sortOption == "D") {
      filteredProducts?.sort().reverse();
    }
  }
  if (sortOption != "") {
    handleSort();
  }

  return (
    <div className="px-4 py-6 pb-20">
      <h1 className="text-6xl font-semibold text-center py-6">
        {params?.categoryName}
      </h1>
      <div className="flex justify-center py-4">
        <Search search={search} setSearch={setSearch} />
        <Sort sortOption={sortOption} setSortOption={setSortOption} />
      </div>
      <div className="flex flex-wrap">
        {filteredProducts?.length > 0
          ? filteredProducts.map((product, index) => (
              <Product
                product={product}
                category={params.categoryName}
                key={index}
              />
            ))
          : Array(8)
              .fill(0)
              .map((_, index) => <ProductSkeleton key={index} />)}
      </div>
    </div>
  );
};

export default ProductPage;
