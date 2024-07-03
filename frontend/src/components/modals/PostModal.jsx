import React, { useState } from "react";
import Button from "../utils/ui/Button";
import Editor from "../utils/Editor";
import { useDispatch } from "react-redux";
import { ImagePlus, Smile, X } from "lucide-react";
import { addPost } from "../../store/postSlice";
const PostModal = ({ postModalOpen, setPostModalOpen }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const handlePostClick = () => {
    if (content) {
      dispatch(addPost({ id: Date.now(), content })); // Dispatching the action with new post
      setPostModalOpen(false); // Close the modal
    } else {
      alert("Title and content cannot be empty"); // Alert if title or content is empty
    }
  };

  return (
    <div className="fixed hover:cursor-default inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white sm:w-[640px] w-[350px] p-4 rounded-lg shadow-lg"
      >
        <div className="w-full flex items-center justify-between">
          <img
            height={32}
            width={32}
            className="rounded-full"
            src="https://avatars.githubusercontent.com/u/101882373?v=4"
            alt=""
          />
          <X
            className="hover:cursor-pointer"
            size={20}
            onClick={() => {
              setPostModalOpen(false);
            }}
          />
        </div>
        <div className="h-[300px] !px-0 mt-4">
          <Editor onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className="flex items-center justify-between ml-8">
          <div className="flex items-center gap-4">
            <div className="relative inline-block group">
              <ImagePlus
                className="cursor-pointer"
                strokeWidth={1.5}
                size={20}
              />
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
          <Button
            title="Post"
            onClick={handlePostClick}
            className="bg-[#00aa45] text-white border-2 border-[#219653] rounded-full px-3.5 py-0.5 hover:bg-[#219653] "
          />
        </div>
      </div>
    </div>
  );
};

export default PostModal;
