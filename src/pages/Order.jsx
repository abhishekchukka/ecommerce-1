import React from "react";
import { useShopContext } from "../context/ShopContext";

const Order = () => {
  const { ordered } = useShopContext();

  // ordered is nothing but the cart items () <button
  //   type="submit" // Consider wrapping in a form and handling onSubmit
  //   className="mt-8 w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
  //   onClick={() => {
  //     navigate("/orders");
  //     setOrdered(cartItems);
  //   }} // Placeholder action
  // >
  //   PLACE ORDER
  // </button> in this way i obtained the ordered products now i have to present them in this screen

  return (
    <div>
      {
        /* {ordered.map((item) => (
        <div>{item}</div>
      ))} */
        // the div should have a status {pending , ready to ship , delivered etc}, trck order button also
      }
    </div>
  );
};

export default Order;
