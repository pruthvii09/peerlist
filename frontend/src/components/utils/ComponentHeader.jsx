import React from "react";
import { Link } from "react-router-dom";

const ComponentHeader = ({ title, iconConfig, href }) => {
  const Icon = iconConfig?.icon;
  const size = iconConfig?.size || "18";
  const iconText = iconConfig?.text || "";
  return (
    <div className="sm:w-[640px] w-full bg-white z-30 fixed top-0 flex items-center justify-between  border-r border-b border-gray-300 py-2.5 px-6 font-medium">
      <h1>{title}</h1>
      {Icon &&
        (href ? (
          <Link
            to={href}
            className="px-2 cursor-pointer py-2 border border-gray-300 rounded-full flex items-center gap-1"
          >
            <Icon size={size} />
            {iconText && <span className="text-xs">{iconText}</span>}
          </Link>
        ) : (
          <div className="px-2 cursor-pointer py-2 border border-gray-300 rounded-full flex items-center gap-1">
            <Icon size={size} />
            {iconText && <span className="text-xs">{iconText}</span>}
          </div>
        ))}
    </div>
  );
};

export default ComponentHeader;
