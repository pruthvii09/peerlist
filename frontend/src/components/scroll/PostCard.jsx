import React from "react";
import {
  EllipsisVertical,
  MessageSquare,
  RefreshCw,
  ArrowBigUp,
  Bookmark,
  Share2,
} from "lucide-react";
import PostTextArea from "./PostTextArea";
const PostCard = ({ post }) => {
  return (
    <div className="sm:px-6 px-3 sm:py-4 py-3 cursor-pointer border-r border-b border-gray-300 hover:bg-[#FAFBFC]">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <img
            height={40}
            width={40}
            className="rounded-full"
            src="https://avatars.githubusercontent.com/u/101882373?v=4"
            alt=""
          />
          {/* &nbsp;•&nbsp; */}
          <div className="leading-[0]">
            <h1 className="font-medium text-sm hover:underline">
              Nayan Jamdar
            </h1>
            <span className="text-xs text-gray-600">
              @nayan&nbsp;•&nbsp;#show&nbsp;•&nbsp;10h
            </span>
          </div>
        </div>
        <div>
          <EllipsisVertical size={16} />
        </div>
      </div>
      <div className="flex flex-col">
        <PostTextArea initialContent={post?.content} />
        <div className="mt-3 sm:ml-12 ml-0 flex items-center justify-between">
          <div className="flex items-center sm:gap-16 gap-4">
            <div className="flex items-center gap-1">
              <div className="p-2 rounded-full hover:bg-[#D6E7F8] hover:text-[#2F80ED]">
                <MessageSquare className="" size={18} />
              </div>
              <span className="text-xs font-mono text-gray-600 font-medium mb-0.5">
                0
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="p-2 rounded-full hover:bg-[#FFEBDA] hover:text-[#F66E10]">
                <RefreshCw className="" size={18} />
              </div>
              <span className="text-xs font-mono text-gray-600 font-medium mb-0.5">
                0
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="p-2 rounded-full hover:bg-[#E2F5EA] hover:text-[#00AA45]">
                <ArrowBigUp className="" strokeWidth={1.5} size={22} />
              </div>
              <span className="text-xs font-mono text-gray-600 font-medium mb-0.5">
                0
              </span>
            </div>
          </div>
          <div className="flex items-center sm:gap-8 gap-4">
            <div className="flex items-center gap-1">
              <div className="p-2 rounded-full hover:bg-[#D6F6EF] hover:text-[#4FB6A0]">
                <Bookmark className="" size={18} />
              </div>
              <span className="text-xs font-mono text-gray-600 font-medium mb-0.5">
                0
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="p-2 rounded-full hover:bg-[#D6E7F8] hover:text-[#2F80ED]">
                <Share2 className="" size={18} />
              </div>
              <span className="text-xs font-mono text-gray-600 font-medium mb-0.5">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
