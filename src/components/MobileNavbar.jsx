import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink } from "react-router-dom";

const MobileMenuContent = ({ visible, setVisible }) => {
  const handleNavLinkClick = () => {
    setVisible(false);
  };

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 z-50 bg-white shadow-xl transition-all duration-300 ease-in-out overflow-y-auto ${
        visible ? "w-full sm:w-80" : "w-0"
      }`}
      // style={{
      //   transform: visible ? "translateX(0)" : "translateX(100%)",
      // }}
    >
      <div className="flex flex-col h-full">
        <div
          onClick={() => setVisible(false)}
          className="flex items-center gap-4 p-5 text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <img
            src={assets.dropdown_icon}
            className="h-5 rotate-180"
            alt="Close menu"
          />
          <p className="font-semibold text-lg">Back</p>
        </div>

        <hr className="border-t border-gray-200 mx-5" />

        <nav className="flex flex-col flex-grow py-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 pl-8 text-gray-700 hover:bg-gray-100 transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500"
                  : ""
              }`
            }
            onClick={handleNavLinkClick}
          >
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 pl-8 text-gray-700 hover:bg-gray-100 transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500"
                  : ""
              }`
            }
            onClick={handleNavLinkClick}
          >
            <span>COLLECTION</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 pl-8 text-gray-700 hover:bg-gray-100 transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500"
                  : ""
              }`
            }
            onClick={handleNavLinkClick}
          >
            <span>ABOUT</span>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 pl-8 text-gray-700 hover:bg-gray-100 transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500"
                  : ""
              }`
            }
            onClick={handleNavLinkClick}
          >
            <span>CONTACT</span>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 pl-8 text-gray-700 hover:bg-gray-100 transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500"
                  : ""
              }`
            }
            onClick={handleNavLinkClick}
          >
            <span>Orders</span>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 pl-8 text-gray-700 hover:bg-gray-100 transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500"
                  : ""
              }`
            }
            onClick={handleNavLinkClick}
          >
            <span>Cart</span>
          </NavLink>

          <NavLink
            to="/place-order"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 pl-8 text-gray-700 hover:bg-gray-100 transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500"
                  : ""
              }`
            }
            onClick={handleNavLinkClick}
          >
            <span>Place Order</span>
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex items-center gap-4 py-3 pl-8 text-gray-700 hover:bg-gray-100 transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500"
                  : ""
              }`
            }
            onClick={handleNavLinkClick}
          >
            <span>Login</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenuContent;
