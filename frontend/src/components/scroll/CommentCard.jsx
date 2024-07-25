import { MoreHorizontal } from "lucide-react";
import React from "react";
import { timeAgo } from "../../utils/functions";

const CommentCard = ({ comment }) => {
  return (
    <div className="px-4 pb-4 flex items-start gap-2 group cursor-pointer">
      <img
        src={comment?.user?.profileImageUrl}
        className="w-8 h-8 object-cover rounded-full"
        alt=""
      />
      <div>
        <h1 className="text-xs font-medium flex items-center gap-2">
          <p className="group-hover:underline">
            {comment.user.firstname} {comment.user.lastname}{" "}
          </p>
          <span className="text-gray-600 text-[10px]">
            {timeAgo(comment?.createdAt)}
          </span>
        </h1>
        <p className="text-sm">{comment.content}</p>
        <div className="flex items-center gap-4 py-1">
          <span className="text-[10px] font-semibold cursor-pointer hover:underline">
            Reply
          </span>
          <span>
            <MoreHorizontal className="cursor-pointer" size={14} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
