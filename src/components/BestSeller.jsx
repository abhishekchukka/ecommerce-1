import React, { useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useShopContext();
  const [bestSeller, setBestSeller] = useState([]);
  useEffect(() => {
    const BestProduct = products.filter((item) => item.bestseller);
    setBestSeller(BestProduct.slice(0, 5));
  }, []);
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title title={"BEST"} title2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident,
          beatae, cumque at eveniet mollitia dolor, nulla nostrum nam commodi
          sequi sunt. Qui error omnis illo possimus voluptates mollitia deserunt
          saepe!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
