import React from "react";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { ArrowUp, Smile } from "lucide-react";
import Skeleton from "react-loading-skeleton";

const SinglePostComponent = ({ data, isLoading }) => {
  const { user } = useSelector((store) => store.user);
  if (isLoading) {
    return (
      <div className="mt-[52px] border-r border-gray-300 h-screen">
        <div className="px-4 py-4">
          <Skeleton height={200} width="100%" />{" "}
        </div>
        {/* Skeleton for PostCard */}
        <div className="px-4 py-3 border-b border-gray-300">
          <div className="border flex justify-between items-center border-gray-300 p-1.5 rounded-full">
            <div className="flex items-center gap-2">
              <Skeleton circle height={32} width={32} />
              <Skeleton height={32} width="70%" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton circle height={24} width={24} />
              <Skeleton circle height={24} width={24} />
            </div>
          </div>
        </div>
        <div className="flex items-center flex-col mt-10">
          <Skeleton height={20} width={150} />
          <Skeleton height={16} width={200} />
        </div>
      </div>
    );
  }
  return (
    <div className="mt-[52px] border-r border-gray-300 h-screen">
      <PostCard post={data} />
      <div className="px-4 py-3 border-b border-gray-300">
        <div className="border flex justify-between items-center border-gray-300 p-1.5 rounded-full">
          <div className="flex items-center gap-2">
            <img
              height={32}
              width={32}
              className="w-8 h-8 rounded-full"
              src={user?.profileImageUrl}
              alt=""
            />
            <input
              type="text"
              className="text-sm outline-none"
              placeholder="Post your comment"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="p-1 border border-gray-300 rounded-full">
              <Smile size={16} />
            </div>
            <div className="bg-[#00aa45] text-white p-1.5 rounded-full border-2 border-[#219653]">
              <ArrowUp size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col mt-10">
        <p className="text-sm">Your upvotes and feedback are welcome!</p>
        <p className="text-xs text-gray-600">
          Words have more power than we think. Be kind.
        </p>
      </div>
    </div>
  );
};

export default SinglePostComponent;
