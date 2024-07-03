import React from "react";

const Button = ({ iconConfig, title, onChange, onClick, className }) => {
  const Icon = iconConfig?.icon;
  const iconSize = iconConfig?.size || "16";

  return (
    <button
      className={`${className} flex gap-1 items-center`}
      onChange={onChange}
      onClick={onClick}
    >
      <span>{title}</span>
      {Icon && <Icon size={iconSize} />}
    </button>
  );
};

export default Button;
