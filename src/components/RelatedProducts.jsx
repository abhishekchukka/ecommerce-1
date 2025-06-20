import React, { useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem"; // Make sure this path is correct

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useShopContext();
  const [relatedProducts, setRelatedProducts] = useState([]); // Initialize as an empty array

  const fetchRelatedProducts = () => {
    if (products.length > 0) {
      // Filter out the current product being viewed if its _id is available
      // (You might want to pass the current product's ID as a prop to exclude it)
      let filteredProducts = products.filter(
        (product) =>
          product.category === category && product.subCategory === subCategory
      );

      // Optional: Shuffle and take a few related products if you have many
      // For now, let's just use the filtered list
      setRelatedProducts(filteredProducts);
    } else {
      setRelatedProducts([]); // Clear if no products are available
    }
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [products, category, subCategory]); // Add category and subCategory to dependencies

  return (
    <div className="my-8">
      {" "}
      {/* Added margin for spacing */}
      <div className="text-center text-3xl py-2">
        <Title title={"Related"} title2={"Products"} />
      </div>
      <div className="grid h-1/12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {" "}
        {/* Added a responsive grid */}
        {relatedProducts && relatedProducts.length > 0 ? (
          relatedProducts.map((product, index) => (
            // Ensure ProductItem expects individual product props

            <ProductItem
              key={product._id || index} // Use product._id for a stable key if available
              {...product}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No related products found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
