import React from "react";
import { Link } from "react-router-dom";

const UpvoteCard = ({ upvote }) => {
  return (
    <div className="px-4 py-4 flex gap-2 group border-b border-gray-300 hover:bg-gray-100">
      <img
        className="w-8 h-8 rounded-full object-cover"
        src={upvote.user.profileImageUrl}
        alt=""
      />
      <div className="">
        <Link
          to={`/user/${upvote.user.username}`}
          className="text-sm font-semibold group-hover:underline"
        >
          {upvote.user.firstname} {upvote.user.lastname}
        </Link>
        <p className="text-xs text-gray-600">{upvote?.user?.bio}</p>
      </div>
    </div>
  );
};

export default UpvoteCard;
