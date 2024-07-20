import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Sidebar from "./Sidebar";

const ProfileSkeleton = () => {
  return (
    <Sidebar>
      <div className="flex">
        <div className="sm:w-[640px] border-r w-full">
          <div className="mb-4 px-4 py-2">
            <Skeleton height={40} />
          </div>
          <div className="">
            {/* UserProfile skeleton */}
            <div className="mb-6 px-4">
              <Skeleton height={200} />
            </div>

            {/* Navigation links skeleton */}
            <div className="mx-6 flex items-center justify-center gap-10 border-b border-gray-300 pb-2.5">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} width={60} />
              ))}
            </div>

            {/* Showcase section skeleton */}
            <div className="pt-8 pb-10 w-full px-6">
              <Skeleton width={200} height={24} className="mb-4" />
              <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Skeleton key={item} height={40} />
                ))}
              </div>
            </div>

            {/* AddProject skeleton */}
            <div className="px-6 mb-8">
              <Skeleton height={200} />
            </div>

            {/* Social links skeleton */}
            <div className="px-8 w-full">
              <div className="pt-14 border-t border-gray-300 flex items-center justify-center gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <Skeleton key={item} circle width={16} height={16} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar skeleton */}
        <div className="hidden sm:block w-[320px]">
          <div className="mb-4 px-4 py-2">
            <Skeleton height={40} />
          </div>
          <div className="mt-8 px-4 flex flex-col gap-4">
            <Skeleton height={200} />
            <Skeleton height={200} />
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default ProfileSkeleton;
