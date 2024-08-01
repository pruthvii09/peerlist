import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NotificationCardSkeleton = () => {
  return (
    <div className="px-4 py-4 flex gap-3 items-start border-b border-gray-300">
      <div>
        <Skeleton circle={true} height={18} width={18} />
      </div>
      <div className="flex gap-2 items-start w-full">
        <div className="flex-shrink-0">
          <Skeleton circle={true} height={32} width={32} />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex items-center justify-between">
            <Skeleton height={20} width={200} />
            <Skeleton height={10} width={30} />
          </div>
          <Skeleton height={10} width="100%" />
          <Skeleton height={10} width="90%" />
          <Skeleton height={10} width="80%" />
        </div>
      </div>
    </div>
  );
};

export default NotificationCardSkeleton;
