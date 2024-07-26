import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navlink = ({ title, icon: Icon, href }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={href}
      className="flex md:flex-row flex-col group items-center gap-2 py-3 hover:cursor-pointer"
    >
      <Icon strokeWidth={1.5} />
      <span
        className={`group-hover:translate-x-1 md:text-base text-[10px] transition-all ease-in-out ${
          pathname === href && "font-semibold"
        }`}
      >
        {title}
      </span>
    </Link>
  );
};

export default Navlink;
