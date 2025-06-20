import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] text-sm text-gray-600 my-10 gap-3 ">
        <div className="flex flex-col gap-2">
          <img src={assets.logo} alt="" className="w-32 py-3" />
          <p className="w-full md:w-2/3 text-gray-600">
            " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
            necessitatibus pariatur nihil iure eum reiciendis fugit possimus,
            incidunt, dolorem doloremque soluta esse obcaecati mollitia porro
            nulla accusantium velit dolorum rerum.
          </p>
        </div>
        <div className=" flex flex-col">
          <h3 className="text-xl font-medium mb-3">Company</h3>
          <ul className="text-gray-500">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-3">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-500">
            <li>+1-3202-324-545</li>
            <li>eexample@forever.com</li>
          </ul>
        </div>
      </div>
      <div>
        <p className="h-[2px] w-full bg-gray-600"></p>
        <p className="text-center py-5 text-s,">
          Copyright 2024@forever.com - All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
