import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Navbar from "./components/Navbar";
import Collection from "./pages/Collection";
import Footer from "./components/Footer";
import Searchbar from "./components/Searchbar";
import { useShopContext } from "./context/ShopContext";

const App = () => {
  const { token } = useShopContext();
  if (!token) {
    return <Login />;
  }
  return (
    <div className="px-4 sm:px-[5vw] lg:px-[9vw]">
      <Navbar />
      <Searchbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="orders" element={<Order />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
