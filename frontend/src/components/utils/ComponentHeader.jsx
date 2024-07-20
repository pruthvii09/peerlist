import React from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";

const ComponentHeader = ({ title, iconConfig, href, follow, onIconClick }) => {
  const Icon = iconConfig?.icon;
  const size = iconConfig?.size || "18";
  const iconText = iconConfig?.text || "";

  const renderIcon = () => (
    <div
      onClick={onIconClick}
      className="px-2 cursor-pointer py-2 border border-gray-300 rounded-full flex items-center gap-1 h-[36px]"
    >
      <Icon size={size} />
      {iconText && <span className="text-xs">{iconText}</span>}
    </div>
  );

  return (
    <div className="sm:w-[640px] w-full bg-white z-30 fixed top-0 flex items-center justify-between border-r border-b border-gray-300 py-2.5 px-6 font-medium h-[56px]">
      <h1>{title}</h1>
      <div className="flex items-center">
        {Icon && (href ? <Link to={href}>{renderIcon()}</Link> : renderIcon())}
        {follow && (
          <Button
            className="bg-[#00aa45] text-white border-2 border-[#219653] rounded-full text-sm px-3.5 py-0.5 hover:bg-[#219653]"
            title="Follow"
          />
        )}
      </div>
    </div>
  );
};

export default ComponentHeader;
