import Laptop from "./components/Laptop";
import Phone from "./components/Phone";
import { products } from "./components/data";

export default function Home() {
  function handleSearch(search) {
    products.filter(
      (product) =>
        product.name.includes(search) ||
        product.description.includes(search) ||
        product.price.includes(search)
    );
  }
  return (
    <>
      <Laptop />
      <Phone />
    </>
  );
}
