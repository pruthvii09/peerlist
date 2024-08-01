import React, { useState } from "react";
import Button from "../utils/ui/Button";
import { Link } from "react-router-dom";
import { ChevronDown, LucideLink, UserMinus } from "lucide-react";
import { useFollowUser } from "../../hooks/profile/useAddFollow";
import { useUnFollowUser } from "../../hooks/profile/useRemoveFollow";
import Badge from "../../assets/icons/Badge";

const ProfileCard = ({ user, follow }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [onFollowUser, setOnFollowUser] = useState(follow);
  const followMutation = useFollowUser();
  const unFollowMutation = useUnFollowUser();
  const handleFollowUser = async () => {
    try {
      setOnFollowUser(true);
      await followMutation.mutateAsync(user?.id);
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };
  const handleUnFollow = async () => {
    try {
      setOnFollowUser(false);
      await unFollowMutation.mutateAsync(user?.id);
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };
  const toggleDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleFollow = (e) => {
    e.preventDefault();
    handleFollowUser();
  };

  const handleUnfollow = (e) => {
    e.preventDefault();
    handleUnFollow();
    setShowDropdown(false);
  };

  const copyProfileUrl = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(
      `${window.location.origin}/user/${user.username}`
    );
    // Optionally, you can show a toast notification here
  };

  return (
    <Link
      to={`/user/${user.username}`}
      className="relative  h-fit hover:bg-[#FAFBFC] group flex border border-gray-300 items-start flex-col p-4 rounded-lg"
    >
      <div className="relative">
        <img
          height={40}
          width={40}
          className="rounded-full w-10 h-10 object-cover"
          src={user?.profileImageUrl}
          alt={`${user.firstname} ${user.lastname}`}
        />
        {user?.emailVerified && (
          <div className="absolute flex h-4 w-4 bg-white items-center justify-center rounded-full bottom-0 right-0">
            <Badge size={12} />
          </div>
        )}
      </div>
      <h1 className="text-sm font-semibold group-hover:underline">
        {user.firstname} {user.lastname}
      </h1>
      <p className="text-gray-600 text-xs paragraph-clamp">{user.bio}</p>
      {onFollowUser ? (
        <div className="absolute right-4">
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex items-center px-3 rounded-full border border-gray-300 py-1 cursor-pointer"
            >
              <span className="text-xs font-medium">Peers</span>
              <ChevronDown size={16} />
            </div>
            {showDropdown && (
              <div className="absolute bg-white border border-gray-300 z-[50] w-48 shadow-xl py-1 md:top-10 md:right-0 top-10 right-0 rounded-md">
                <div
                  onClick={copyProfileUrl}
                  className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100"
                >
                  <LucideLink size={16} />
                  <span className="text-xs">Copy profile URL</span>
                </div>
                <div
                  onClick={handleUnfollow}
                  className="flex items-center gap-2 px-4 py-3 text-red-600 cursor-pointer hover:bg-gray-100"
                >
                  <UserMinus size={16} />
                  <span className="text-xs">Unfollow</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Button
          onClick={handleFollow}
          className="absolute right-4 text-white font-medium bg-black rounded-full text-xs px-2 py-1"
          title="Follow"
        />
      )}
    </Link>
  );
};

export default ProfileCard;
