import React, { useState } from "react";
import Button from "../utils/ui/Button";
import { Link } from "react-router-dom";
import { ChevronDown, LucideLink, UserMinus } from "lucide-react";
import { useFollowUser } from "../../hooks/profile/useAddFollow";
import { useUnFollowUser } from "../../hooks/profile/useRemoveFollow";

const ProfileCard = ({ user, follow }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [onFollowUser, setOnFollowUser] = useState(follow);
  const followMutation = useFollowUser();
  const unFollowMutation = useUnFollowUser();
  console.log("follow", follow, onFollowUser);
  const handleFollowUser = async () => {
    try {
      await followMutation.mutateAsync(user?.id);
      setOnFollowUser(true);
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };
  const handleUnFollow = async () => {
    try {
      await unFollowMutation.mutateAsync(user?.id);
      setOnFollowUser(false);
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
      className="relative h-fit hover:bg-[#FAFBFC] group flex border border-gray-300 items-start flex-col p-4 rounded-lg"
    >
      <img
        height={40}
        width={40}
        className="rounded-full w-10 h-10 object-cover"
        src={user?.profileImageUrl}
        alt={`${user.firstname} ${user.lastname}`}
      />
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
              <div className="absolute bg-white border border-gray-300 z-[999999] w-48 shadow-xl py-1 top-10 rounded-md">
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
