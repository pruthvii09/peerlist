import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileCardSkeleton = () => {
  return (
    <div className="relative  flex border border-gray-300 items-start flex-col p-4 rounded-lg">
      <Skeleton circle={true} height={40} width={40} />
      <Skeleton width={100} />
      <Skeleton width={200} />
      <div className="absolute right-4">
        <Skeleton width={40} height={20} />
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
