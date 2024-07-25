import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import { useFollowUser } from "../../hooks/profile/useAddFollow";
import { ChevronDown, Link as LucideLink, UserMinus } from "lucide-react";
import { toast } from "react-toastify";
import { useUnFollowUser } from "../../hooks/profile/useRemoveFollow";
import { useSelector } from "react-redux";
import { useModal } from "../../context/ModalContext";

const ComponentHeader = ({
  title,
  iconConfig,
  href,
  follow,
  onIconClick,
  isAlreadyFollowing: initialIsAlreadyFollowing,
}) => {
  const Icon = iconConfig?.icon;
  const size = iconConfig?.size || "18";
  const iconText = iconConfig?.text || "";
  const { user } = useSelector((store) => store.user);
  const { showModal } = useModal();
  const [isFollowing, setIsFollowing] = useState(initialIsAlreadyFollowing);
  const [followOptions, setFollowOptions] = useState(false);

  const followMutation = useFollowUser();
  const unFollowMutation = useUnFollowUser();

  const handleFollow = async () => {
    try {
      if (!user) {
        showModal("login");
      } else {
        setIsFollowing(true); // Update state to true on success
        await followMutation.mutateAsync(follow);
      }
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };
  const handleUnFollow = async () => {
    try {
      if (!user) {
        showModal("login");
      } else {
        setIsFollowing(false); // Update state to true on success
        await unFollowMutation.mutateAsync(follow);
      }
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };
  const copyWebsite = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success("Profile URL Copied");
        setFollowOptions(!followOptions);
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
        // Handle error here
      });
  };
  // Render icon
  const renderIcon = () => (
    <div
      onClick={onIconClick}
      className="px-2 cursor-pointer py-2 border border-gray-300 rounded-full flex items-center gap-1 h-[36px]"
    >
      <Icon size={size} />
      {iconText && <span className="text-xs">{iconText}</span>}
    </div>
  );

  return (
    <div className="sm:w-[640px] w-full bg-white z-30 fixed top-0 flex items-center justify-between border-r border-b border-gray-300 py-2.5 px-6 font-medium h-[56px]">
      <h1>{title}</h1>
      <div className="flex items-center">
        {Icon && (href ? <Link to={href}>{renderIcon()}</Link> : renderIcon())}
        {isFollowing ? (
          <div className="relative">
            <button
              onClick={() => setFollowOptions(!followOptions)}
              className="flex items-center font-medium gap-1 border border-gray-300 px-3 rounded-full py-1"
            >
              <span className="font-medium text-sm">Following</span>
              <ChevronDown size={18} />
            </button>
            {followOptions && (
              <div className="absolute bg-white border border-gray-300 z-[999999] w-48 shadow-xl py-1 top-10 rounded-md">
                <div
                  onClick={copyWebsite}
                  className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100"
                >
                  <LucideLink size={16} />
                  <span className="text-xs">Copy profile URL</span>
                </div>
                <div
                  onClick={handleUnFollow}
                  className="flex items-center gap-2 px-4 py-3 text-red-600 cursor-pointer hover:bg-gray-100"
                >
                  <UserMinus size={16} />
                  <span className="text-xs">Unfollow</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {follow && (
              <Button
                className="bg-[#00aa45] text-white border-2 border-[#219653] rounded-full text-sm px-3.5 py-0.5 hover:bg-[#219653]"
                title="Follow"
                onClick={handleFollow}
                disabled={followMutation.isLoading} // Disable while loading
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ComponentHeader;
