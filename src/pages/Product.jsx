import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { ToastContainer, toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useShopContext();
  const [productData, setProductData] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null); // New state for selected size
  const [activeTab, setActiveTab] = useState("description"); // New state for active tab

  useEffect(() => {
    const fetchProductData = () => {
      const foundProduct = products.find(
        (product) => product._id === productId
      );

      if (foundProduct) {
        setProductData(foundProduct);
        const productImages = foundProduct.image || [];
        setImages(productImages);
        // Set the first image as the initially selected image
        if (productImages.length > 0) {
          setSelectedImage(productImages[0]);
        } else {
          setSelectedImage(""); // No images, no selected image
        }
        // Automatically select the first size if available
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        } else {
          setSelectedSize(null);
        }
      } else {
        setProductData(null);
        setImages([]);
        setSelectedImage("");
        setSelectedSize(null);
      }
    };

    fetchProductData();
  }, [products, productId]);

  // Display a loading state or "Product not found" if productData is null
  if (!productData) {
    return (
      <div className="text-center py-8">
        Loading product details or Product not found...
      </div>
    );
  }

  // Dummy rating data (you'd replace this with actual logic later)
  const dummyRating = 4; // Example: 4 out of 5 stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-2xl ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <ToastContainer />
      <div className="opacity-100 flex flex-col sm:flex-row py-4 gap-4">
        {/* Image Gallery Section */}
        <div className="w-full sm:w-1/2 flex items-center justify-center">
          {images.length > 0 ? (
            <>
              {/* Desktop View: Thumbnails on left (now visible on all sizes as per your change) */}
              <div className="flex flex-col gap-2 p-2 border rounded max-h-[500px] overflow-y-auto">
                {images.map((imageSrc, index) => (
                  <img
                    key={index}
                    src={imageSrc}
                    onClick={() => setSelectedImage(imageSrc)}
                    alt={`Product thumbnail ${index + 1}`}
                    className={`w-22 h-22 sm:w-24 sm:h-24 object-cover cursor-pointer rounded-sm ${
                      // Adjusted sizes for clarity
                      selectedImage === imageSrc
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                  />
                ))}
              </div>

              {/* Main image display (visible on all screen sizes) */}
              <div className="flex-1 w-full p-2">
                <img
                  className="w-full h-auto object-contain max-h-[500px]" // Adjusted max-h for consistency
                  src={selectedImage || images[0]} // Fallback to first image if selectedImage is empty
                  alt={productData.name || "Product image"}
                />
              </div>
            </>
          ) : (
            <p>No images available for this product.</p>
          )}
        </div>
        {/* Product Details Section */}
        <div className="w-full sm:w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>

          {/* Dummy Rating */}
          <div className="flex items-center gap-2 mb-4">
            {renderStars(dummyRating)}
            <span className="text-gray-600 text-sm">(124 Reviews)</span>{" "}
            {/* Dummy review count */}
          </div>

          <p className="text-xl text-gray-700 mb-4">${productData.price}</p>

          {/* Sizes Section */}
          {productData.sizes && productData.sizes.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-200 ${
                      selectedSize === size
                        ? "bg-black text-white border-blue-500"
                        : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              toast.success("Item added to cart!");
              addToCart(productId, selectedSize);
            }}
            className="bg-black hover:bg-gray-600  active:bg-black text-white font-bold py-2 px-4 rounded mt-4  cursor-pointer"
          >
            Add to Cart
          </button>

          {/* Description and Review Sections */}
          <div className="mt-8">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-2 px-4 text-lg font-medium ${
                  activeTab === "description"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-2 px-4 text-lg font-medium ${
                  activeTab === "reviews"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Reviews
              </button>
            </div>
            <div className="mt-4 p-2">
              {activeTab === "description" && (
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {productData.description}
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-600">
                    <li>Material: High-quality breathable fabric</li>
                    <li>
                      Care Instructions: Machine wash cold, tumble dry low
                    </li>
                    <li>Fit Type: Regular fit, comfortable for all-day wear</li>
                    <li>
                      Occasion: Perfect for casual outings and semi-formal
                      events
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="overflow-y-scroll max-h-[120px]">
                  <h3 className="text-xl font-semibold mb-3">
                    Customer Reviews
                  </h3>
                  {/* Dummy Reviews */}
                  <div className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center mb-1">
                      {renderStars(5)}{" "}
                      <span className="ml-2 font-medium">Amazing Product!</span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      "These palazzo pants are so comfortable and stylish! The
                      fabric is soft, and they fit perfectly. Highly recommend!"
                      - Jane D.
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Reviewed on June 15, 2025
                    </p>
                  </div>
                  <div className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center mb-1">
                      {renderStars(4)}{" "}
                      <span className="ml-2 font-medium">Good Quality</span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      "Really happy with the purchase. The waist belt adds a
                      nice touch. Lost one star because it arrived a day late,
                      but the product itself is great." - Mark S.
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Reviewed on June 10, 2025
                    </p>
                  </div>
                  <div className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center mb-1">
                      {renderStars(3)}{" "}
                      <span className="ml-2 font-medium">
                        Decent for the price
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      "They are okay for the price. Not as flowy as I expected
                      but still comfortable." - Emily R.
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Reviewed on June 8, 2025
                    </p>
                  </div>
                  {/* Add a "Write a Review" button or form here */}
                  {/* <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mt-4">
                  Write a Review
                </button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
