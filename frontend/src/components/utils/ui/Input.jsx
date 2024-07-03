import React from "react";

const Input = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label className="flex justify-between items-center pb-0.5 text-xs">
        {label}
      </label>
      <input
        className="w-full text-sm px-2 py-1.5 outline-none rounded border border-gray-300 transition-all duration-100 hover:border-gray-500"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
