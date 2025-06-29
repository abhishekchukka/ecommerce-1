import React, { useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import Title from "../components/Title"; // Assuming Title component path is correct
import axios from "axios"; // Import axios

const Order = () => {
  const { backendUrl, token } = useShopContext(); // Get backendUrl and token from context
  const [userOrdersData, setUserOrdersData] = useState([]); // State to store fetched user orders
  const [loading, setLoading] = useState(true); // State for loading status

  const fetchUserOrders = async () => {
    if (!token) {
      setLoading(false);
      // Optionally navigate to login or show a message
      return;
    }
    setLoading(true);
    try {
      // The backend /api/order/userorders expects userId in req.body
      // The authUser middleware already adds userId to req.body based on the token.
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {}, // Body might be empty, as userId is added by middleware
        { headers: { token } }
      );

      if (response.data.success) {
        setUserOrdersData(response.data.orders);
        console.log("Fetched user orders:", response.data.orders);
      } else {
        console.error("Failed to fetch user orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
      // Handle error (e.g., show a toast message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [token]); // Re-fetch orders if token changes (e.g., user logs in/out)

  // Helper to format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-3xl mb-6 text-center">
        <Title title={"YOUR"} title2={"ORDERS"} />
      </div>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">
          Loading your orders...
        </p>
      ) : userOrdersData.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You haven't placed any orders yet.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {userOrdersData.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Order ID: <span className="text-black">{order._id}</span>
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Order Date: {formatDate(order.date)}
                  </p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "Processing" ||
                          order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    Status: {order.status}
                  </span>
                  {/* You might implement actual tracking link based on order ID here */}
                  <button
                    onClick={() => alert(`Tracking order ${order._id}`)}
                    className="ml-0 sm:ml-4 mt-3 sm:mt-0 bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Track Order
                  </button>
                </div>
              </div>

              {/* Ordered Products List */}
              <div className="grid grid-cols-1 gap-4">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.productId}-${item.size}-${index}`} // Use a combination for unique key
                    className="flex items-center border-b border-gray-100 py-3 last:border-b-0"
                  >
                    <img
                      src={
                        item.image ||
                        "https://placehold.co/80x80/CCCCCC/FFFFFF?text=No+Image"
                      } // Fallback image
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm">Size: {item.size}</p>
                      <p className="text-gray-600 text-sm">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Price per item: ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-gray-800 font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Totals & Address */}
              <div className="mt-6 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-gray-800">
                  <p className="text-lg font-bold mb-2">Delivery Address:</p>
                  <p>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state} -{" "}
                    {order.address.zipcode}
                  </p>
                  <p>{order.address.country}</p>
                  <p>Phone: {order.address.phone}</p>
                  <p>Email: {order.address.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    Total Amount: ${order.amount.toFixed(2)}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    Payment Method: {order.paymentMethod}
                  </p>
                  <p className="text-gray-700 text-sm">
                    Payment Status: {order.payment ? "Paid" : "Pending / COD"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
