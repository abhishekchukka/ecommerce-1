// import React, { useContext, useEffect, useState } from "react";
import { useShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
// import { useLocation } from "react-router-dom";

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch, visible } =
    useShopContext();

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text "
          placeholder="Search"
          value={search}
          className="flex-1 outline-none bg-inherit text-sm "
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={assets.search_icon} className="w-4" alt="" />
      </div>
      <img
        src={assets.cross_icon}
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        alt=""
      />
    </div>
  ) : null;
};

export default Searchbar;
