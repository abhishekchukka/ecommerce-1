import { createContext, useContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
const ShopContext = createContext();
import { toast } from "react-toastify";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const currency = "$";
  const [ordered, setOrdered] = useState({});
  // const [cartSize, setCartSize] = useState([]);
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

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Please select a size");
      return;
    }
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  useEffect(() => {
    console.log(cartItems);
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
    getCartCount,
    navigate,
    ordered,
    setOrdered,
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
