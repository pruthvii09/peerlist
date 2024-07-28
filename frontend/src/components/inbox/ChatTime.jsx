import React from "react";

const ChatTime = ({ formattedDate }) => {
  return (
    <div className="flex items-center py-4 justify-center">
      <span className="border-b flex-1 border-gray-300"></span>
      <span className="text-[10px] font-normal flex-1 max-w-fit border border-gray-300 rounded-xl px-2 py-0.5 text-gray-600">
        {formattedDate}
      </span>
      <span className="border-b flex-1 border-gray-300"></span>
    </div>
  );
};

export default ChatTime;
