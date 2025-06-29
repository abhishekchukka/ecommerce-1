import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { useShopContext } from "../context/ShopContext";
import axios from "axios"; // Import axios for API calls
import { toast } from "react-toastify"; // Import toast for notifications

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

  // Access cart data, navigation, token, and backend URL from ShopContext
  const { cartItems, products, navigate, backendUrl, token, setCartItems } =
    useShopContext();

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
  // Using delivery_fee from context (if available, otherwise set a default)
  const deliveryFee = subtotal > 0 ? 5 : 0;
  const totalAmount = subtotal + deliveryFee;

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrderHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (totalAmount <= 0) {
      toast.error(
        "Your cart is empty. Please add items before placing an order."
      );
      return;
    }

    // Basic form validation
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "street",
      "city",
      "zipcode",
      "country",
      "state",
      "phone",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        toast.error(
          `Please fill in the ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field.`
        );
        return;
      }
    }

    // Prepare items for the backend (transform from nested object to array of objects)
    let orderItems = [];
    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (product) {
        for (const size in cartItems[productId]) {
          orderItems.push({
            productId: productId,
            name: product.name,
            image:
              product.image && product.image.length > 0 ? product.image[0] : "", // Use first image or empty
            price: product.price,
            size: size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }

    if (orderItems.length === 0) {
      toast.error("Your cart is empty. Cannot place an order.");
      return;
    }

    let orderData = {
      userId: "", // Will be set by auth middleware on backend
      items: orderItems,
      amount: totalAmount,
      address: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        street: data.street,
        city: data.city,
        zipcode: data.zipcode,
        country: data.country,
        state: data.state,
        phone: data.phone,
      },
      // paymentMethod: method, // Not needed for backend for COD, as it's hardcoded
      // payment: method === "cod" ? false : true, // Handled on backend
    };

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setCartItems({}); // Clear cart on frontend after successful order
        navigate("/orders"); // Navigate to user orders page or a success page
      } else {
        toast.error(response.data.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order (frontend):", error);
      toast.error("An error occurred while placing your order.");
    }
  };

  return (
    <form
      onSubmit={placeOrderHandler}
      className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8"
    >
      {/* DELIVERY INFORMATION SECTION (Left Side) */}
      <div className="w-full lg:w-3/5 bg-white p-6 rounded-lg shadow-md">
        <Title title={"DELIVERY"} title2={"INFORMATION"} />
        <div className="mt-6 flex flex-col gap-4">
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
              type="tel"
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              className="outline-none border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Phone"
              required
            />
          </div>
        </div>
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
              onChange={() => setMethod("cod")}
              className="hidden"
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

          {/* Stripe (disabled for now) */}
          <div
            className={`flex items-center p-3 border rounded-md cursor-not-allowed opacity-50 ${
              method === "stripe"
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-300"
            }`}
            // onClick={() => setMethod("stripe")} // Disable click for now
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
              readOnly // Make it readOnly
              className="hidden"
            />
            <label
              htmlFor="stripe"
              className="text-lg font-medium text-gray-800 flex-1 cursor-not-allowed"
            >
              Pay with Card (Stripe) - Coming Soon
            </label>
            <span
              className={`w-5 h-5 rounded-full border-2 ${
                method === "stripe"
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-400"
              }`}
            ></span>
          </div>

          {/* Razorpay (disabled for now) */}
          {assets.razorpay_logo && (
            <div
              className={`flex items-center p-3 border rounded-md cursor-not-allowed opacity-50 ${
                method === "razorpay"
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-300"
              }`}
              // onClick={() => setMethod("razorpay")} // Disable click for now
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
                readOnly // Make it readOnly
                className="hidden"
              />
              <label
                htmlFor="razorpay"
                className="text-lg font-medium text-gray-800 flex-1 cursor-not-allowed"
              >
                Pay with Razorpay - Coming Soon
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
          type="submit"
          className="mt-8 w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          // The onSubmit on the form will handle the click
        >
          PLACE ORDER
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
