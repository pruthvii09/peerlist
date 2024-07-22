import React from "react";
import {
  EllipsisVertical,
  MessageSquare,
  RefreshCw,
  ArrowBigUp,
  Bookmark,
  Share2,
} from "lucide-react";
import { timeAgo } from "../../utils/functions";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Link to={`/scroll/post/${post?.id}`}>
      <div className="px-3 sm:px-6 py-3 sm:py-4 cursor-pointer border-b border-gray-300">
        <div className="flex justify-between items-start sm:items-center">
          <div className="flex gap-2 sm:gap-3">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={post?.user?.profileImageUrl}
              alt="User avatar"
            />
            <div className="leading-tight">
              <h1 className="font-medium text-sm hover:underline">
                {post?.user.firstname} {post?.user.lastname}
              </h1>
              <span className="text-xs text-gray-600">
                @{post?.user.username}&nbsp;•&nbsp;#show&nbsp;•&nbsp;{" "}
                {timeAgo(post?.createdAt)}
              </span>
            </div>
          </div>
          <div className="p-1">
            <EllipsisVertical size={16} />
          </div>
        </div>
        <div className="flex flex-col mt-2 sm:mt-3">
          <div className="overflow-hidden">
            {/* Ensure content doesn't overflow */}
            <p
              className="whitespace-pre-line post-content text-sm" // Adjusting whitespace handling
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <ActionButton
                Icon={MessageSquare}
                count={0}
                hoverColor="hover:text-[#2F80ED] hover:bg-[#D6E7F8]"
              />
              <ActionButton
                Icon={RefreshCw}
                count={0}
                hoverColor="hover:text-[#F66E10] hover:bg-[#FFEBDA]"
              />
              <ActionButton
                Icon={ArrowBigUp}
                count={0}
                hoverColor="hover:text-[#00AA45] hover:bg-[#E2F5EA]"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6 mt-2 sm:mt-0">
              <ActionButton
                Icon={Bookmark}
                count={0}
                hoverColor="hover:text-[#4FB6A0] hover:bg-[#D6F6EF]"
              />
              <ActionButton
                Icon={Share2}
                count={0}
                hoverColor="hover:text-[#2F80ED] hover:bg-[#D6E7F8]"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ActionButton = ({ Icon, count, hoverColor }) => (
  <div className="flex items-center gap-1">
    <div className={`p-1.5 rounded-full ${hoverColor}`}>
      <Icon size={18} strokeWidth={1.5} />
    </div>
    <span className="text-xs font-mono text-gray-600 font-medium">{count}</span>
  </div>
);

export default PostCard;
