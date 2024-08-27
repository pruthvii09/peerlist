import React, { useRef, useState } from "react";
import Button from "../utils/ui/Button";
import { ImagePlus, Smile, X } from "lucide-react";
import { useModal } from "../../context/ModalContext";
//import QuillEditor from "../utils/Editor";
import { useAddPost } from "../../hooks/post/useAddPost";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import CkEditor from "../utils/CkEditor";
import useImageUpload from "../../hooks/useImageUpload";
import { toast } from "react-toastify";
const PostModal = () => {
  const [content, setContent] = useState("<p>Write something...</p>");
  const [images, setImages] = useState([]);

  const { user } = useSelector((store) => store.user);
  const { hideModal } = useModal();

  const addPost = useAddPost();

  const handlePostClick = () => {
    if (!content) return;
    addPost.mutate({ content: content, images: images });
  };

  //ck
  const { uploadImage, removeImage, uploading } = useImageUpload();
  const fileInputRef = useRef(null);
  const handleImageUpload = async (event) => {
    if (images.length >= 4) {
      return toast.error("Maximum 4 images can be uploaded");
    }
    const file = event.target.files[0];
    if (file) {
      const { url, id } = await uploadImage(file);
      setImages((prevImages) => [...prevImages, { url, id }]);
    }
  };
  const handleRemoveImage = (imageToRemove) => {
    removeImage(imageToRemove);
    setImages((prevImages) =>
      prevImages.filter((image) => image.id !== imageToRemove)
    );
  };

  return (
    <div className="fixed hover:cursor-default inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
        <div className="h-[300px] px-0 md:px-4 mt-4">
          {/* <QuillEditor
            onChange={(e) => setContent(e.target.value)}
            height={200}
          /> */}
          <CkEditor content={content} setContent={setContent} />
        </div>
        <div className="pb-4 px-4 flex gap-3">
          {images?.length > 0 && (
            <>
              {images.map((image) => (
                <div key={image.id} className="relative w-fit">
                  <img
                    src={image.url}
                    className="w-16 h-16 rounded-md border object-cover border-gray-300"
                    alt="profile"
                  />
                  <div
                    onClick={() => handleRemoveImage(image?.id)}
                    className="absolute cursor-pointer -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full border border-gray-300 bg-white"
                  >
                    <X size={16} />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="flex items-center justify-between ml-8">
          <div className="flex items-center gap-4">
            <label className="relative inline-block group cursor-pointer">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <ImagePlus strokeWidth={1.5} size={20} />
            </label>
            <div className="relative inline-block group">
              <Smile className="cursor-pointer" strokeWidth={1.5} size={20} />
            </div>
            <div className="text-xs hidden md:block text-gray-600">
              Type @ to mention people and companies.
            </div>
          </div>
          <Button
            loading={addPost.isPending || uploading}
            title="Post"
            onClick={handlePostClick}
            className="bg-[#00aa45] text-white border-2 border-[#219653] rounded-full px-3.5 py-0.5 hover:bg-[#219653] "
          />
        </div>
      </motion.div>
    </div>
  );
};

export default PostModal;
