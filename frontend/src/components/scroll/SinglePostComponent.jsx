import React, { useRef, useState } from "react";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { ArrowUp, Loader2, Smile } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { useAddComment } from "../../hooks/post/useAddComment";
import CommentCard from "./CommentCard";
import UpvoteCard from "./UpvoteCard";
import useDebounce from "../../hooks/useDebounce";
import useSearchProfile from "../../hooks/profile/useSearchProfile";
import { useModal } from "../../context/ModalContext";

const SinglePostComponent = ({ data, isLoading }) => {
  const { user } = useSelector((store) => store.user);
  const { showModal } = useModal();
  const [content, setContent] = useState("");
  const [comment, setComment] = useState(true);
  const addCommentMutation = useAddComment();
  const handleComment = async () => {
    if (!content) return;
    if (!user) {
      showModal("login");
    } else {
      addCommentMutation.mutate({ content: content, postId: data?.id });
      setContent("");
    }
  };
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedQuery = useDebounce(searchTerm, 400);
  const { data: users } = useSearchProfile(debouncedQuery);
  const inputRef = useRef(null);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setContent(value);

    const lastAtIndex = value.lastIndexOf("@");
    if (lastAtIndex !== -1 && lastAtIndex === value.length - 1) {
      setShowPopup(true);
      setSearchTerm("");
    } else if (lastAtIndex !== -1) {
      setSearchTerm(value.slice(lastAtIndex + 1));
    } else {
      setShowPopup(false);
    }
  };
  const handleUserSelect = (user) => {
    const lastAtIndex = content.lastIndexOf("@");
    const newValue = content.slice(0, lastAtIndex) + `@${user.username} `;
    setContent(newValue);
    setShowPopup(false);
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default action (such as submitting a form)
      handleComment();
    }
  };
  if (isLoading) {
    return (
      <div className="mt-[52px] border-r border-gray-300 h-screen">
        <div className="px-4 py-4">
          <Skeleton height={200} width="100%" />{" "}
        </div>
        {/* Skeleton for PostCard */}
        <div className="px-4 py-3 border-b border-gray-300">
          <div className="border flex justify-between items-center border-gray-300 p-1.5 rounded-full">
            <div className="flex items-center gap-2">
              <Skeleton circle height={32} width={32} />
              <Skeleton height={32} width="70%" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton circle height={24} width={24} />
              <Skeleton circle height={24} width={24} />
            </div>
          </div>
        </div>
        <div className="flex items-center flex-col mt-10">
          <Skeleton height={20} width={150} />
          <Skeleton height={16} width={200} />
        </div>
      </div>
    );
  }
  return (
    <div className="mt-[52px] border-r border-gray-300 h-full">
      <PostCard post={data} />
      <div className="px-4 pt-3 border-b border-gray-300">
        <div className="border flex justify-between items-center border-gray-300 p-1.5 rounded-full">
          <div className="flex items-center gap-2 relative">
            <img
              height={32}
              width={32}
              className="w-8 h-8 rounded-full object-cover"
              src={
                user?.profileImageUrl ||
                "https://dqy38fnwh4fqs.cloudfront.net/website/emptyDP.png"
              }
              alt=""
            />
            <input
              ref={inputRef}
              type="text"
              value={content}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              className="text-sm outline-none"
              placeholder="Post your comment"
            />
            {showPopup && (
              <div className="w-[300px] absolute shadow-2xl top-12 bg-white rounded border border-gray-300">
                {users?.map((user, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 flex items-start gap-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleUserSelect(user)}
                  >
                    <div className="">
                      <img
                        src={user?.profileImageUrl}
                        className="w-8 h-8 rounded-full object-cover"
                        alt=""
                      />
                    </div>
                    <div>
                      <h1 className="text-sm font-semibold">
                        {user.firstname} {user.lastname}
                      </h1>
                      <p className="text-xs text-gray-600 paragraph-clamp">
                        {user.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="p-1 border border-gray-300 rounded-full">
              <Smile size={16} />
            </div>
            {addCommentMutation.isPending ? (
              <div className="bg-[#00aa45] text-white p-1.5 rounded-full border-2 border-[#219653]">
                <Loader2 size={18} className="animate-spin" />
              </div>
            ) : (
              <div
                onClick={handleComment}
                className="bg-[#00aa45] text-white p-1.5 rounded-full border-2 border-[#219653]"
              >
                <ArrowUp size={18} />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-3">
          <div
            onClick={() => setComment(true)}
            className={`text-xs py-2.5 cursor-pointer  ${
              comment
                ? "border-b-2 border-green-600 text-green-600 font-medium"
                : "hover:border-b-2"
            }`}
          >
            COMMENTS •&nbsp; {data?.comments?.length}
          </div>
          <div
            onClick={() => setComment(false)}
            className={`text-xs py-2.5 cursor-pointer  ${
              comment
                ? "hover:border-b-2"
                : "border-b-2 border-green-600 text-green-600 font-medium"
            }`}
          >
            UPVOTES •&nbsp; {data?.likes?.length}
          </div>
        </div>
      </div>
      <div className="mt-10">
        {comment ? (
          <>
            {data?.comments?.map((comment) => (
              <CommentCard comment={comment} key={comment.id} />
            ))}
          </>
        ) : (
          <>
            {data?.likes?.map((upvote) => (
              <UpvoteCard key={upvote.id} upvote={upvote} />
            ))}
          </>
        )}
        <div className="flex mt-8 items-center text-xs justify-center text-gray-600 pb-20">
          Looks Like you have reached end
        </div>
      </div>
    </div>
  );
};

export default SinglePostComponent;
