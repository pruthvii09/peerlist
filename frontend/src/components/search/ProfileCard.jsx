import React from "react";
import Button from "../utils/ui/Button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
const ProfileCard = ({ user, isLoading }) => {
  if (isLoading) {
    return (
      <div className="relative -z-30 h-fit hover:bg-[#FAFBFC] group flex border border-gray-300 items-start flex-col p-4 rounded-lg">
        <Skeleton circle={true} height={40} width={40} />
        <Skeleton height={20} width={100} className="mt-2" />
        <Skeleton height={15} width={150} className="mt-1" />
      </div>
    );
  }
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
