// ChatSkeleton.js
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ChatSkeleton = () => {
  return (
    <div className="mt-[52px] max-h-full min-h-screen border-r border-gray-300 pb-24">
      <div className="sticky top-[56px] bg-white z-[99] px-4 py-3 border-b border-gray-300 flex items-center justify-between">
        <div className="flex gap-2 cursor-pointer group">
          <div>
            <Skeleton circle={true} height={40} width={40} />
          </div>
          <div>
            <h1 className="text-sm font-normal group-hover:underline">
              <Skeleton width={100} />
            </h1>
            <p className="text-xs text-gray-600">
              <Skeleton width={150} />
            </p>
          </div>
        </div>
        <div className="h-6 w-6 flex items-center justify-center cursor-pointer rounded-full">
          <Skeleton circle={true} height={24} width={24} />
        </div>
      </div>
      <div className="hi ">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="px-6 pb-4 ">
            <div className="flex items-center gap-2 pt-4">
              <Skeleton circle={true} height={24} width={24} />
              <p className="cursor-pointer">
                <Skeleton width={50} />
              </p>
              <span className="text-[10px] text-gray-600">
                <Skeleton width={10} />
              </span>
            </div>
            <div className="text-sm ml-8">
              <div className="flex gap-2 items-start justify-between">
                <Skeleton height={20} width={500} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSkeleton;
