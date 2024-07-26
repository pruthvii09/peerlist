import React, { useState } from "react";
import {
  EllipsisVertical,
  MessageSquare,
  Bookmark,
  Share2,
  Flag,
  Edit,
  Trash2,
} from "lucide-react";
import Upvote from "../../assets/Upvote";
import { motion } from "framer-motion";
import { timeAgo } from "../../utils/functions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../context/ModalContext";
import { useDeletePostMutation } from "../../hooks/post/useDeletePost";
import { useAddUpvotePost } from "../../hooks/post/useUpvotePost";
import { useRemoveUpvotePost } from "../../hooks/post/useRemoveUpvotePost";

const PostCard = ({ post }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(post?.likes.length || 0);
  const [animationKey, setAnimationKey] = useState(0);

  const { user } = useSelector((store) => store.user);
  const { showModal } = useModal();

  const isOwnProfile = post?.user?.username === user?.username;
  const hasUpvoted = post?.likes?.some((like) => like?.user?.id === user?.id);
  const [upvote, setUpvoted] = useState(hasUpvoted || false);

  const deletePostMutation = useDeletePostMutation();
  const upvoteMutation = useAddUpvotePost();
  const removeUpvoteMutation = useRemoveUpvotePost();

  const onConfirm = () => {
    deletePostMutation.mutate(post?.id);
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (!user) {
      showModal("login");
    } else {
      if (!upvote) {
        setUpvoted(true);
        setUpvoteCount((prev) => prev + 1);
        setAnimationKey((prev) => prev + 1);
        upvoteMutation.mutate({ postId: post?.id });
      } else {
        setUpvoted(false);
        setUpvoteCount((prev) => prev - 1);
        removeUpvoteMutation.mutate({ postId: post?.id });
      }
    }
  };

  return (
    <Link to={`/scroll/post/${post?.id}`}>
      <div className="px-3 md:px-6 py-3  cursor-pointer border-b border-gray-300">
        <div className="flex justify-between items-start md:items-center">
          <div className="flex gap-2 md:gap-3">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={post?.user?.profileImageUrl}
              alt="User avatar"
            />
            <div className="leading-tight">
              <h1 className="font-medium text-sm hover:underline">
                {post?.user.firstname} {post?.user.lastname}
              </h1>
              <span className="text-xs text-gray-600">
                @{post?.user.username}&nbsp;•&nbsp;#show&nbsp;•&nbsp;{" "}
                {timeAgo(post?.createdAt)}
              </span>
            </div>
          </div>
          <div className="p-1 relative -z-[999]">
            <EllipsisVertical
              onClick={(e) => {
                e.preventDefault();
                setShowDropdown(!showDropdown);
              }}
              size={16}
              className=""
            />
            {showDropdown && (
              <div className="absolute bg-white border border-gray-300 z-[999999] w-48 shadow-xl py-1 top-8 right-2 rounded-md">
                <div
                  // onClick={copyProfileUrl}
                  className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100"
                >
                  <Flag size={16} />
                  <span className="text-xs">Report</span>
                </div>
                {isOwnProfile && (
                  <>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        showModal("editpost", { post: post });
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-2 px-4 py-3  cursor-pointer hover:bg-gray-100"
                    >
                      <Edit size={16} />
                      <span className="text-xs">Edit</span>
                    </div>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDropdown(false);
                        showModal("confirm", { onConfirm: onConfirm });
                      }}
                      className="flex items-center gap-2 px-4 py-3 cursor-pointer text-red-600 hover:bg-gray-100"
                    >
                      <Trash2 size={16} />
                      <span className="text-xs">Delete</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-2 md:mt-3">
          <div className="overflow-hidden">
            {/* Ensure content doesn't overflow */}
            <p
              className="whitespace-pre-line post-content text-sm" // Adjusting whitespace handling
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-2 md:gap-6">
              <ActionButton
                Icon={MessageSquare}
                count={post?.comments?.length}
                hoverColor="hover:text-[#2F80ED] hover:bg-[#D6E7F8]"
              />
              {/* <ActionButton
                Icon={RefreshCw}
                count={0}
                hoverColor="hover:text-[#F66E10] hover:bg-[#FFEBDA]"
              /> */}
              <div
                onClick={handleClick}
                className="flex group  items-center cursor-pointer  transition-shadow duration-200"
              >
                <motion.div
                  key={animationKey}
                  className=" group-hover:text-[#00AA45] flex items-center p-2 rounded-full"
                  initial={{ y: 0 }}
                  animate={
                    upvote ? { y: [-0, -10, -0], scale: [1, 1.2, 1] } : { y: 0 }
                  }
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Upvote upvote={upvote} />
                </motion.div>
                <motion.span
                  className={`font-mono text-xs font-semibold ${
                    upvote ? "text-green-600" : "text-gray-500"
                  }`}
                  animate={{ scale: upvote ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {upvoteCount}
                </motion.span>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-6 mt-2 md:mt-0">
              <ActionButton
                Icon={Bookmark}
                count={0}
                hoverColor="hover:text-[#4FB6A0] hover:bg-[#D6F6EF]"
              />
              <ActionButton
                Icon={Share2}
                count={0}
                hoverColor="hover:text-[#2F80ED] hover:bg-[#D6E7F8]"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ActionButton = ({ Icon, count, hoverColor, animationProps }) => {
  // const [isClicked, setIsClicked] = useState(false);

  // const handleClick = () => {
  //   setIsClicked(true);
  //   setTimeout(() => setIsClicked(false), 1000); // Reset after animation
  // };

  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <div className={`p-1.5 rounded-full ${hoverColor}`}>
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <span className="text-xs font-mono text-gray-600 font-medium">
        {count}
      </span>
    </div>
  );
};

export default PostCard;
