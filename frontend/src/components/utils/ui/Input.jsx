// components/Input.jsx
import React from "react";

const Input = ({ label, placeholder, value, onChange, type, readOnly }) => {
  return (
    <div className="flex flex-col">
      <label className="flex justify-between items-center pb-0.5 text-xs">
        {label}
      </label>
      <input
        className={`w-full text-sm px-2 py-1.5 outline-none rounded border border-gray-300 transition-all duration-100 hover:border-gray-500 ${
          readOnly && "cursor-not-allowed"
        }`}
        type={type}
        readOnly={readOnly}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
