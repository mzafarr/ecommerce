"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "@/components/Common/Product";
import { ProductSkeleton } from "@/components/Common/ProductSkeleton";

export default function Home() {
  const [laptopsData, setLaptopsData] = useState([]);
  const [phonesData, setPhonesData] = useState([]);
  const [accessoriesData, setAccessoriesData] = useState([]);

  useEffect(() => {
    const fetchData = async (category) => {
      try {
        const storedData = localStorage.getItem(category);

        if (!storedData || JSON.parse(storedData).length === 0) {
          const res = await axios.get(
            `/api/products?category=${category}&limit=6`
          );
          return res.data.products;
        }
        return JSON.parse(storedData);
      } catch (error) {
        console.error(`Error fetching ${category} data:`, error);
        return [];
      }
    };

    const getData = async () => {
      try {
        const laptopsData = await fetchData("laptop");
        if (laptopsData.length !== 0) {
          localStorage.setItem("laptop", JSON.stringify(laptopsData));
          setLaptopsData(laptopsData);
        }

        const phonesData = await fetchData("phone");
        if (phonesData.length !== 0) {
          localStorage.setItem("phone", JSON.stringify(phonesData));
          setPhonesData(phonesData);
        }

        const accessoriesData = await fetchData("accessory");
        if (accessoriesData.length !== 0) {
          localStorage.setItem("accessory", JSON.stringify(accessoriesData));
          setAccessoriesData(accessoriesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="bg-gray-100 text-slate-900">
      <section className="lg:max-w-lg md:min-w-[700px] mx-auto p-12 flex flex-col md:flex-row items-center justify-between md:gap-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold ">
            Unleash Innovation in Your Life
          </h1>
          <p className="my-3">Explore a World of Cutting-Edge Tech</p>
          <Link href={`/Laptops`} className={buttonVariants()}>
            Shop Now
          </Link>
        </div>
        <img
          src="/img/x360.png"
          alt="laptop"
          loading="eager"
          className="max-w-[240px] max-h-[240px] aspect-square my-3"
        />
      </section>

      <section className="bg-gray-50 p-12">
        <h1 className="text-4xl font-semibold text-center mx-auto">
          Featured Products
        </h1>

        <div className="flex flex-col gap-3">
          <h3 className="text-3xl text-slate-700 font-medium text-center mt-6">
            Laptops
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-[1100px] mx-auto">
            {laptopsData.length !== 0
              ? laptopsData.map((product) => (
                  <Product
                    product={product}
                    category={"laptop"}
                    key={product.id}
                  />
                ))
              : Array(6)
                  .fill(0)
                  .map((_, index) => <ProductSkeleton key={index} />)}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-3xl text-slate-700 font-medium text-center mt-6">
            Phones
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-[1100px] mx-auto">
            {phonesData.length !== 0
              ? phonesData.map((product) => (
                  <Product
                    product={product}
                    category={"phone"}
                    key={product.id}
                  />
                ))
              : Array(6)
                  .fill(0)
                  .map((_, index) => <ProductSkeleton key={index} />)}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-3xl text-slate-700 font-medium text-center mt-6">
            Accessories
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-[1100px] mx-auto">
            {accessoriesData.length !== 0
              ? accessoriesData.map((product) => (
                  <Product
                    product={product}
                    category={"accessory"}
                    key={product.id}
                  />
                ))
              : Array(6)
                  .fill(0)
                  .map((_, index) => <ProductSkeleton key={index} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
