import React from "react";
import RightComponentHeader from "./RightComponentHeader";

const Rightsidebar = ({ children }) => {
  return (
    <div className="fixed z-50 right-10 h-full hidden sm:block">
      <div>
        <RightComponentHeader />
      </div>
      <div className="pb-20 h-full overflow-y-auto w-[348px] px-6 border-r border-gray-300 scrollbar-hide">
        {children}
      </div>
    </div>
  );
};

export default Rightsidebar;
