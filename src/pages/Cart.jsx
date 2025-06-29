import React, { useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import Title from "../components/Title"; // Assuming Title component path is correct
import { assets } from "../assets/frontend_assets/assets";
// axios and toast are already handled within ShopContext, no need to import them here
// import axios from "axios";
// import { toast } from "react-toastify";

const Cart = () => {
  // Destructure the necessary functions and state from ShopContext
  const {
    products,
    cartItems,
    // We will use the context's updateQuantity and removeFromCart
    updateQuantity: contextUpdateQuantity, // Rename to avoid conflict with local function if needed
    removeFromCart: contextRemoveFromCart, // Rename to avoid conflict
    navigate,
    // backendUrl, // Not needed directly in Cart component for these actions
    // token,      // Not needed directly in Cart component for these actions
  } = useShopContext();

  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // Effect to process cartItems into a displayable format (cartData)
  // and calculate the subtotal whenever cartItems or products change.
  useEffect(() => {
    const tempData = [];
    let newSubtotal = 0;

    for (const productId in cartItems) {
      // Find the full product details from the main products array
      const product = products.find((p) => p._id === productId);

      if (product) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          tempData.push({
            _id: productId,
            name: product.name,
            image:
              product.image && product.image.length > 0
                ? product.image[0]
                : "https://placehold.co/100x100/CCCCCC/FFFFFF?text=No+Image", // Use first image or placeholder
            price: product.price,
            size: size,
            quantity: quantity,
          });
          newSubtotal += product.price * quantity;
        }
      }
    }
    setCartData(tempData);
    setSubtotal(newSubtotal);
  }, [cartItems, products]); // Re-run when cartItems or products change

  // --- No need for local updateQuantity and removeItem functions here anymore ---
  // Just call the ones from context directly in the JSX onClick handlers.

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen ">
      <div className="text-3xl mb-6 text-center">
        <Title title={"YOUR"} title2={"CART"} />
      </div>

      {cartData.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            {cartData.map((item) => (
              <div
                key={`${item._id}-${item.size}`} // Unique key for each item (product ID + size)
                className="flex items-center border-b border-gray-200 py-4 last:border-b-0"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm">Size: {item.size}</p>
                  <p className="text-gray-800 font-bold mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 mr-4">
                  <button
                    onClick={() =>
                      contextUpdateQuantity(
                        item._id,
                        item.size,
                        item.quantity - 1
                      )
                    }
                    className="px-3 py-1 bg-gray-200 cursor-pointer text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      contextUpdateQuantity(
                        item._id,
                        item.size,
                        item.quantity + 1
                      )
                    }
                    className="px-3 py-1 bg-gray-200 text-gray-700 cursor-pointer rounded-md hover:bg-gray-300 focus:outline-none"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => contextRemoveFromCart(item._id, item.size)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium focus:outline-none"
                >
                  <img
                    src={assets.bin_icon}
                    className="size-5 cursor-pointer"
                    alt="Remove item"
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              Cart Summary
            </h2>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700">Shipping:</span>
              <span className="text-gray-900">Free</span>{" "}
              {/* This might come from context or be a fixed value */}
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700">Subtotal:</span>
              <span className="text-xl font-bold text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/place-order")}
              className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-600 active:bg-black cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
