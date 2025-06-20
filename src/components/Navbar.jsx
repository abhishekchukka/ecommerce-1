import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import MobileMenuContent from "./MobileNavbar"; // Assuming this is your MobileMenuContent component
import MobileNavbar from "./MobileNavbar";
import { useShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, visible: iconshow, getCartCount } = useShopContext();
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="logo" className="w-36" />{" "}
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1 ">
          {({ isActive }) => (
            <>
              <li>HOME</li>
              <hr
                className={`w-1/2 border-none h-[2.5px] ${
                  isActive ? "bg-red-500" : "bg-gray-700"
                }`}
              />
            </>
          )}
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          {({ isActive }) => (
            <>
              <li>COLLECTION</li>
              <hr
                className={`w-1/2 border-none h-[2.5px] ${
                  isActive ? "bg-red-500" : "bg-gray-700"
                }`}
              />
            </>
          )}
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          {({ isActive }) => (
            <>
              <li>ABOUT</li>
              <hr
                className={`w-1/2 border-none h-[2.5px] ${
                  isActive ? "bg-red-500" : "bg-gray-700"
                }`}
              />
            </>
          )}
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          {({ isActive }) => (
            <>
              <li>CONTACT</li>
              <hr
                className={`w-1/2 border-none h-[2.5px] ${
                  isActive ? "bg-red-500" : "bg-gray-700"
                }`}
              />
            </>
          )}
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        {iconshow && (
          <img
            src={assets.search_icon}
            onClick={() => {
              setShowSearch((x) => !x);
            }}
            className="w-5 cursor-pointer"
            alt="Search icon"
          />
        )}
        <div className="group relative hidden sm:block">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile icon"
          />
          <div className="group-hover:block hidden absolute right-0 top-full mt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-md">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to={"/cart"} className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 cursor-pointer"
            alt="Cart icon"
          />
          <p
            className="absolute text-center w-4 right-[-5px] leading-4 top-[10px] bg-black text-white aspect-square rounded-full text-[10px]
          "
          >
            {getCartCount()}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          onClick={() => {
            setVisible((x) => !x);
          }}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu icon"
        />

        <MobileMenuContent visible={visible} setVisible={setVisible} />
      </div>
    </div>
  );
};

export default Navbar;
