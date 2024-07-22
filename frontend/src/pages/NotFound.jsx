import React from "react";
import Sidebar from "../components/utils/Sidebar";

const NotFound = () => {
  return (
    <Sidebar>
      <div className="flex flex-col justify-center h-full">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-500">404</h1>
          <p className="text-xl mt-4">Sorry, page not found.</p>
          <span className="text-xs text-gray-600">
            The page you are looking for was moved, removed, renamed or might
            have never existed!
          </span>
        </div>
      </div>
    </Sidebar>
  );
};

export default NotFound;
