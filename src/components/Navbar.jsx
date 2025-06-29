import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import MobileMenuContent from "./MobileNavbar"; // Assuming this is your MobileMenuContent component
import { useShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false); // Renamed for clarity
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false); // New state for profile dropdown
  const navigate = useNavigate();
  const {
    setShowSearch,
    visible: iconshow,
    getCartCount,
    token,
    setToken,
  } = useShopContext();

  const profileDropdownRef = useRef(null); // Ref to detect clicks outside the dropdown

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownVisible(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownRef]);

  const handleProfileClick = () => {
    setProfileDropdownVisible((prev) => !prev); // Toggle visibility
  };

  const handleLinkClick = () => {
    // Optionally close the dropdown when a link inside it is clicked
    setProfileDropdownVisible(false);
  };
  if (!token) {
    navigate("/login");
  }
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
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

        {/* --- Profile Icon and Click-to-Toggle Dropdown --- */}
        <div className="relative hidden sm:block" ref={profileDropdownRef}>
          {" "}
          {/* Ref attached here */}
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile icon"
            onClick={handleProfileClick} // Click handler to toggle visibility
          />
          {profileDropdownVisible && ( // Conditionally render based on state
            <div className="absolute right-0 top-full mt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-md shadow-lg">
                <Link
                  to="/profile"
                  className="cursor-pointer hover:text-black"
                  onClick={handleLinkClick}
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="cursor-pointer hover:text-black"
                  onClick={handleLinkClick}
                >
                  Orders
                </Link>
                {/* Ensure your logout function correctly handles session clearing */}
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken("");
                    handleLinkClick();
                  }}
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to={"/cart"} className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 cursor-pointer"
            alt="Cart icon"
          />
          <p className="absolute text-center w-4 right-[-5px] leading-4 top-[10px] bg-black text-white aspect-square rounded-full text-[10px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          onClick={() => {
            setMobileMenuVisible((x) => !x); // Use new state name
          }}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu icon"
        />

        <MobileMenuContent
          visible={mobileMenuVisible}
          setVisible={setMobileMenuVisible}
          token={token}
        />
      </div>
    </div>
  );
};

export default Navbar;
