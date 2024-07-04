import React, { useState } from "react";
import { ImagePlus, Smile } from "lucide-react";
import Button from "../utils/ui/Button";
import PostModal from "../modals/PostModal";
import LoginModal from "../modals/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal, openLoginModal } from "../../store/modalSlice";
const PostInput = () => {
  const [postModalOpen, setPostModalOpen] = useState(false);
  const { user } = useSelector((store) => store.user);
  const { isLoginModalOpen } = useSelector((store) => store.modal); // Assuming you have a modal slice
  const dispatch = useDispatch();

  const handlePostClick = () => {
    if (user) {
      console.log("hello bhaii");
      setPostModalOpen(true);
    } else {
      // Open login modal (assuming you have an action for this)
      dispatch(openLoginModal());
    }
  };

  const handleCloseLoginModal = () => {
    dispatch(closeLoginModal());
  };
  console.log("user", user);
  return (
    <div className="sm:px-6 px-3 sm:py-4 py-3 hover:cursor-pointer border-b border-gray-300 flex flex-col gap-2 w-full">
      {postModalOpen && (
        <PostModal
          postModalOpen={postModalOpen}
          setPostModalOpen={setPostModalOpen}
        />
      )}
      {isLoginModalOpen && <LoginModal onClose={handleCloseLoginModal} />}
      <div onClick={handlePostClick} className="flex items-center gap-2">
        <img
          height={40}
          width={40}
          className="rounded-full"
          src="https://avatars.githubusercontent.com/u/101882373?v=4"
          alt=""
        />
        <p className="text-gray-600 text-sm">What are you working on?</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 ml-14">
          <div className="relative inline-block group">
            <ImagePlus className="cursor-pointer" strokeWidth={1.5} size={20} />
            {/* <div className="hidden group-hover:block absolute whitespace-nowrap bottom-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-black/80 text-white text-xs rounded">
              Add Image
            </div> */}
          </div>
          <div className="relative inline-block group">
            <Smile className="cursor-pointer" strokeWidth={1.5} size={20} />
            {/* <div className="hidden rounded-md text-xs group-hover:block absolute -top-8 bg-black/80 whitespace-nowrap text-white px-1 py-1 -left-6 mt-1">
              Emoji
            </div> */}
          </div>
        </div>
        <div className="mr-2">
          <Button
            title="Post"
            className="bg-[#00aa45] text-white border-2 border-[#219653] rounded-full px-3.5 py-0.5 hover:bg-[#219653] "
          />
        </div>
      </div>
    </div>
  );
};

export default PostInput;
