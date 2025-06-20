import React from "react";

const Title = ({ title, title2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500">
        {title} <span className="text-gray-700 font-medium">{title2}</span>
      </p>
      <p className="h-[2px] w-8 sm:w-11  bg-gray-700"></p>
    </div>
  );
};

export default Title;
