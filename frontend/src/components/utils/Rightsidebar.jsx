import React from "react";
import RightComponentHeader from "./RightComponentHeader";

const Rightsidebar = ({ children }) => {
  return (
    <div className="fixed right-10 h-full hidden sm:block">
      <div>
        <RightComponentHeader />
      </div>
      <div className="pt-14 h-full overflow-y-auto w-[348px] px-6 border-r border-gray-300">
        {children}
      </div>
    </div>
  );
};

export default Rightsidebar;
