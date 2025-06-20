import React from "react";
import { useShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ _id, image, name, price }) => {
  const { currency } = useShopContext();
  return (
    <Link to={`/product/${_id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt={name}
          className="hover:scale-120 transition ease-in-out duration-500"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
