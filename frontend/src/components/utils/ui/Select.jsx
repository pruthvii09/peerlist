import React from "react";

const Select = ({ label, options }) => {
  return (
    <div className="flex flex-col">
      <label className="flex justify-between items-center pb-0.5 text-xs">
        {label}
      </label>
      <select className="w-full text-sm px-2 py-1.5 outline-none rounded border border-gray-300 transition-all duration-100 hover:border-gray-500">
        {options?.map((option) => (
          <option className="py-2" value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
