import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets"; // Make sure your assets object has these logos/icons
import { useShopContext } from "../context/ShopContext"; // Assuming you need cart totals from here

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod"); // State for selected payment method
  const [data, setData] = useState({
    // State to manage form input data
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    state: "",
    phone: "",
  });

  // Access cart data from ShopContext (assuming it calculates subtotal like in Cart.jsx)
  const { cartItems, products, navigate, setOrdered } = useShopContext();

  // Calculate subtotal for display on this page
  const calculateSubtotal = () => {
    let newSubtotal = 0;
    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (product) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          newSubtotal += product.price * quantity;
        }
      }
    }
    return newSubtotal;
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal > 0 ? 5 : 0; // Example: $5 delivery fee if cart is not empty
  const totalAmount = subtotal + deliveryFee;

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* DELIVERY INFORMATION SECTION (Left Side) */}
      <div className="w-full lg:w-3/5 bg-white p-6 rounded-lg shadow-md">
        <Title title={"DELIVERY"} title2={"INFORMATION"} />
        <form className="mt-6 flex flex-col gap-4">
          {/* Name Inputs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              className="outline-none border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              className="outline-none border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Last Name"
              required
            />
          </div>
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              className="outline-none border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Email address"
              required
            />
          </div>
          {/* Street */}
          <div>
            <input
              type="text"
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              className="outline-none border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Street"
              required
            />
          </div>
          {/* City, State, Zipcode */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              className="outline-none border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
              placeholder="City"
              required
            />
            <input
              type="text"
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              className="outline-none border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
              placeholder="State"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              className="outline-none border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Zip Code"
              required
            />
            <input
              type="text"
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              className="outline-none border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Country"
              required
            />
          </div>
          {/* Phone */}
          <div>
            <input
              type="tel" // Use type="tel" for phone numbers
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              className="outline-none border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Phone"
              required
            />
          </div>
        </form>
      </div>

      {/* CART TOTALS & PAYMENT METHOD SECTION (Right Side) */}
      <div className="w-full lg:w-2/5 bg-white p-6 rounded-lg shadow-md h-fit">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Cart Totals</h2>
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex justify-between items-center text-gray-700">
            <p>Subtotal:</p>
            <p className="font-semibold">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <p>Delivery Fee:</p>
            <p className="font-semibold">${deliveryFee.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center text-xl font-bold border-t pt-3 mt-3">
            <p>Total:</p>
            <p>${totalAmount.toFixed(2)}</p>
          </div>
        </div>

        {/* Payment Method Section */}
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          Payment Method
        </h2>
        <div className="flex flex-col gap-4">
          {/* Cash on Delivery (COD) */}
          <div
            className={`flex items-center p-3 border rounded-md cursor-pointer transition-all duration-200 ${
              method === "cod"
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setMethod("cod")}
          >
            {assets.cod_icon && (
              <img src={assets.cod_icon} alt="COD" className="w-8 h-8 mr-3" />
            )}
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="cod"
              checked={method === "cod"}
              onChange={() => setMethod("cod")} // Redundant but good for accessibility
              className="hidden" // Hide default radio button
            />
            <label
              htmlFor="cod"
              className="text-lg font-medium text-gray-800 flex-1 cursor-pointer"
            >
              Cash on Delivery
            </label>
            <span
              className={`w-5 h-5 rounded-full border-2 ${
                method === "cod"
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-400"
              }`}
            ></span>
          </div>

          {/* Stripe */}
          <div
            className={`flex items-center p-3 border rounded-md cursor-pointer transition-all duration-200 ${
              method === "stripe"
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setMethod("stripe")}
          >
            {assets.stripe_logo && (
              <img
                src={assets.stripe_logo}
                alt="Stripe"
                className="w-8 h-8 mr-3"
              />
            )}
            <input
              type="radio"
              id="stripe"
              name="paymentMethod"
              value="stripe"
              checked={method === "stripe"}
              onChange={() => setMethod("stripe")}
              className="hidden"
            />
            <label
              htmlFor="stripe"
              className="text-lg font-medium text-gray-800 flex-1 cursor-pointer"
            >
              Pay with Card (Stripe)
            </label>
            <span
              className={`w-5 h-5 rounded-full border-2 ${
                method === "stripe"
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-400"
              }`}
            ></span>
          </div>

          {/* Razorpay (example, if you have this in assets) */}
          {assets.razorpay_logo && ( // Only show if razorpay_logo exists
            <div
              className={`flex items-center p-3 border rounded-md cursor-pointer transition-all duration-200 ${
                method === "razorpay"
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setMethod("razorpay")}
            >
              <img
                src={assets.razorpay_logo}
                alt="Razorpay"
                className="w-8 h-8 mr-3"
              />
              <input
                type="radio"
                id="razorpay"
                name="paymentMethod"
                value="razorpay"
                checked={method === "razorpay"}
                onChange={() => setMethod("razorpay")}
                className="hidden"
              />
              <label
                htmlFor="razorpay"
                className="text-lg font-medium text-gray-800 flex-1 cursor-pointer"
              >
                Pay with Razorpay
              </label>
              <span
                className={`w-5 h-5 rounded-full border-2 ${
                  method === "razorpay"
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-400"
                }`}
              ></span>
            </div>
          )}
        </div>

        {/* Place Order Button */}
        <button
          type="submit" // Consider wrapping in a form and handling onSubmit
          className="mt-8 w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={() => {
            navigate("/orders");
            setOrdered(cartItems);
          }} // Placeholder action
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
