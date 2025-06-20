import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Ourpolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-10 ">
      <div>
        <img src={assets.exchange_icon} alt="" className="w-12 m-auto mb-5" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-600">We Offer Hassle Free Exchange</p>
      </div>
      <div>
        <img src={assets.quality_icon} alt="" className="w-12 m-auto mb-5" />
        <p className="font-semibold">7 day return Policy</p>
        <p className="text-gray-600">We Offer Hassle Free Exchange</p>
      </div>
      <div>
        <img src={assets.support_img} alt="" className="w-12 m-auto mb-5" />
        <p className="font-semibold">Best Customer SUpport</p>
        <p className="text-gray-600">We provide 24/7 support</p>
      </div>
    </div>
  );
};

export default Ourpolicy;
