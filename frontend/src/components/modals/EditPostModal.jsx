import React, { useState, useEffect } from "react";
import Button from "../utils/ui/Button";
import { ImagePlus, Smile, X } from "lucide-react";
import { useModal } from "../../context/ModalContext";
import { useSelector } from "react-redux";
import { useUpdatePostMutation } from "../../hooks/post/useUpdatePost";
import CkEditor from "../utils/CkEditor";

const EditPostModal = ({ post }) => {
  const [content, setContent] = useState(post?.content);
  const [initialContent, setInitialContent] = useState(post?.content);
  const { user } = useSelector((store) => store.user);
  const { hideModal } = useModal();

  useEffect(() => {
    setInitialContent(post?.content);
  }, [post]);
  const updatePostMuatation = useUpdatePostMutation();
  const handlePostClick = () => {
    if (content !== initialContent) {
      updatePostMuatation.mutate({ content, postId: post?.id });
    }
  };

  return (
    <div className="fixed hover:cursor-default inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white md:w-[640px] w-[350px] p-4 rounded-lg shadow-lg"
      >
        <div className="w-full flex items-center justify-between">
          <img
            height={32}
            width={32}
            className="rounded-full h-8 w-8 object-cover"
            src={user?.profileImageUrl}
            alt=""
          />
          <X
            className="hover:cursor-pointer"
            size={20}
            onClick={() => {
              hideModal();
            }}
          />
        </div>
        <div className="h-[300px] !px-0 mt-4">
          <CkEditor setContent={setContent} content={content} />
        </div>
        <div className="flex items-center justify-between ml-8">
          <div className="flex items-center gap-4">
            <div className="relative inline-block group">
              <ImagePlus
                className="cursor-pointer"
                strokeWidth={1.5}
                size={20}
              />
            </div>
            <div className="relative inline-block group">
              <Smile className="cursor-pointer" strokeWidth={1.5} size={20} />
            </div>
          </div>
          <Button
            title="Post"
            onClick={handlePostClick}
            loading={updatePostMuatation.isPending}
            className="bg-[#00aa45] text-white border-2 border-[#219653] rounded-full px-3.5 py-0.5 hover:bg-[#219653]"
          />
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
