import { Loader2 } from "lucide-react";
import React from "react";

const Button = ({
  iconConfig,
  title,
  onChange,
  onClick,
  className,
  loading,
}) => {
  const Icon = iconConfig?.icon;
  const iconSize = iconConfig?.size || "16";

  return (
    <button
      className={`${className} flex gap-1 items-center`}
      onChange={onChange}
      onClick={onClick}
    >
      {loading ? (
        <div>
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <span>{title}</span>
          {Icon && <Icon size={iconSize} />}
        </>
      )}
    </button>
  );
};

export default Button;
