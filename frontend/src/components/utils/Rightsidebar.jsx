import React from "react";
import RightComponentHeader from "./RightComponentHeader";

const Rightsidebar = ({ children }) => {
  return (
    <div className="sm:h-screen hidden sm:flex sm:flex-col">
      <div className="fixed z-50">
        <RightComponentHeader />
        <div
          className="flex-1 overflow-y-auto w-[348px] px-6 border-r border-gray-300 scrollbar-hide"
          style={{ height: "calc(100vh - 64px)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Rightsidebar;
