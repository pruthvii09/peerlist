import React from "react";
import ChatTime from "./ChatTime";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { formatChatTime } from "../../utils/functions";

const ChatContent = ({ chat }) => {
  const { user } = useSelector((store) => store.user);
  const isOwnProfile = user?.id === chat?.senderId;
  const { formattedDate, formattedTime } = formatChatTime(chat?.createdAt);
  return (
    <div>
      <ChatTime formattedDate={formattedDate} />
      <div className={`px-6 pb-4 ${isOwnProfile ? "" : "bg-gray-100/70"}`}>
        <div className="flex items-center gap-2 pt-4">
          <img
            className="w-6 h-6 rounded-full object-cover"
            src={chat?.sender.profileImageUrl}
            alt=""
          />
          {isOwnProfile ? (
            <p className="text-xs font-semibold hover:underline cursor-pointer">
              You
            </p>
          ) : (
            <p className="text-xs font-semibold hover:underline cursor-pointer">
              {chat?.sender.firstname}
            </p>
          )}
          <span className="text-[10px] text-gray-600">{formattedTime}</span>
        </div>
        <div className="text-sm ml-8">
          <div className="flex gap-2 items-start justify-between">
            <div>{chat?.content}</div>
            <div className="text-gray-600 cursor-pointer">
              <MoreHorizontal strokeWidth={1} size={12} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
