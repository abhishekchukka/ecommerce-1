import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  // ... (your existing state variables)
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const deliveryFee = 10;
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const currency = "$";
  const [ordered, setOrdered] = useState({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const delivery_fee = 10;
  const [visible, setVisible] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const location = useLocation();

  const getCartCount = () => {
    let totalCount = 0;
    for (let key in cartItems) {
      for (let size in cartItems[key]) {
        totalCount += cartItems[key][size];
      }
    }
    return totalCount;
  };

  const getUserCart = async (token) => {
    if (!token) {
      setCartItems({});
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`, // Ensure this endpoint is correct for fetching cart
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        console.log("Fetched cart data:", response.data.cartData);
        setCartItems(response.data.cartData || {}); // Defensive: ensure it's an object
      } else {
        console.error("Failed to fetch cart:", response.data.message);
        setCartItems({});
      }
    } catch (error) {
      console.error("Error getting user cart:", error);
      toast.error("Failed to retrieve cart.");
      setCartItems({});
    }
  };

  // This function is for setting an absolute quantity (or removing if quantity <= 0)
  const updateQuantity = async (itemId, size, quantity) => {
    let newCartItems = structuredClone(cartItems);

    if (quantity <= 0) {
      if (newCartItems[itemId] && newCartItems[itemId][size]) {
        // Check if path exists before deleting
        delete newCartItems[itemId][size];
        if (Object.keys(newCartItems[itemId]).length === 0) {
          delete newCartItems[itemId];
        }
      }
    } else {
      if (!newCartItems[itemId]) {
        newCartItems[itemId] = {}; // Ensure the product object exists
      }
      newCartItems[itemId][size] = quantity;
    }

    setCartItems(newCartItems);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`, // Backend endpoint for updating quantity
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error updating quantity on backend:", error);
        toast.error("Failed to update cart quantity.");
      }
    }
  };

  // This function is for adding an item, specifically incrementing by 1
  const addToCart = async (itemId, size) => {
    let newCartItems = structuredClone(cartItems);

    if (!size) {
      toast.error("Please select a size");
      return;
    }

    // Ensure the product ID entry exists and is an object
    if (!newCartItems[itemId]) {
      newCartItems[itemId] = {};
    }

    // Ensure the specific size entry exists, then increment
    if (!newCartItems[itemId][size]) {
      newCartItems[itemId][size] = 1;
    } else {
      newCartItems[itemId][size] += 1;
    }

    setCartItems(newCartItems);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/`, // Backend endpoint for adding to cart
          { itemId, size }, // Backend should handle incrementing by 1
          { headers: { token } }
        );
        // toast.success("Item added to cart!");
      } catch (error) {
        console.error("Error adding to cart on backend:", error);
        toast.error("Failed to connect to API or add to cart.");
      }
    }
  };

  // This function is for explicitly removing an item by size
  const removeFromCart = async (itemId, size) => {
    let newCartItems = structuredClone(cartItems);

    if (newCartItems[itemId] && newCartItems[itemId][size]) {
      delete newCartItems[itemId][size];
      if (Object.keys(newCartItems[itemId]).length === 0) {
        delete newCartItems[itemId];
      }
    }

    setCartItems(newCartItems);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/remove`, // Backend endpoint for removing item
          { itemId, size },
          { headers: { token } }
        );
        toast.success("Item removed from cart!");
      } catch (error) {
        console.error("Error removing from cart on backend:", error);
        toast.error("Failed to remove item from cart.");
      }
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Error fetching product list");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error("Failed to connect to API or fetch data.");
    }
  };

  useEffect(() => {
    getProducts();
    getUserCart(token);
  }, [token]);

  useEffect(() => {
    console.log("Current cartItems:", cartItems);
  }, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    visible,
    setVisible,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    removeFromCart, // Make sure to export this
    getCartCount,
    navigate,
    ordered,
    setOrdered,
    backendUrl,
    token,
    setToken,
  };

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;

export const useShopContext = () => {
  return useContext(ShopContext);
};
