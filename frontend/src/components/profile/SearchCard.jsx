import React from "react";
import { Link } from "react-router-dom";

const SearchCard = ({ user }) => {
  return (
    <Link
      to={`/user/${user.username}`}
      className="flex items-center gap-2 py-2 px-4 rounded group hover:bg-gray-50"
    >
      <img
        className="w-8 h-8 rounded-full"
        src={user?.profileImageUrl}
        alt=""
      />
      <div className="flex flex-col">
        <h1 className="text-sm font-medium group-hover:underline">
          {user.firstname} {user.lastname}
        </h1>
        <p className="text-xs">{user.bio}</p>
      </div>
    </Link>
  );
};

export default SearchCard;
