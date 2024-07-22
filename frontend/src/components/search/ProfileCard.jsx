import React from "react";
import Button from "../utils/ui/Button";
import { Link } from "react-router-dom";
const ProfileCard = ({ user }) => {
  return (
    <Link
      to={`/user/${user.username}`}
      className="relative h-fit hover:bg-[#FAFBFC] group flex border border-gray-300 items-start flex-col p-4 rounded-lg"
    >
      <img
        height={40}
        width={40}
        className="rounded-full w-10 h-10 object-cover"
        src={user?.profileImageUrl}
        alt=""
      />
      <h1 className="text-sm font-semibold group-hover:underline">
        {user.firstname} {user.lastname}
      </h1>
      <p className="text-gray-600 text-xs paragraph-clamp">{user.bio}</p>
      <Button
        className="absolute right-4 text-white font-medium bg-black rounded-full text-xs px-2 py-1"
        title="Follow"
      />
    </Link>
  );
};

export default ProfileCard;
