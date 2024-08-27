import React, { useEffect, useState } from "react";
import { ImagePlus, Plus, Smile } from "lucide-react";
import Button from "../utils/ui/Button";
import { useSelector } from "react-redux";
import { useModal } from "../../context/ModalContext";
const PostInput = () => {
  const { showModal } = useModal();
  const { user } = useSelector((store) => store.user);

  const handlePostClick = () => {
    if (user) {
      showModal("post");
    } else {
      showModal("login");
    }
  };

  // eslint-disable-next-line no-unused-vars
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust this value as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="md:px-6 top-0 bg-white hidden px-3 md:py-4 py-3 hover:cursor-pointer border-b border-gray-300 md:flex flex-col gap-2 w-full">
        <div onClick={handlePostClick} className="flex items-center gap-2">
          <img
            height={40}
            width={40}
            className="rounded-full h-10 w-10 object-cover"
            src={
              user?.profileImageUrl
                ? user?.profileImageUrl
                : "https://dqy38fnwh4fqs.cloudfront.net/website/emptyDP.png"
            }
            alt=""
          />
          <p className="text-gray-600 text-sm">What are you working on?</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 ml-14">
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
          <div className="mr-2">
            <Button
              title="Post"
              className="bg-[#00aa45] text-white border-2 border-[#219653] rounded-full px-3.5 py-0.5 hover:bg-[#219653] "
            />
          </div>
        </div>
      </div>
      <div
        onClick={handlePostClick}
        className="fixed shadow-md z-10 h-12 w-12 flex items-center justify-center rounded-full border-2 bg-[#00aa45] border-[#219653] text-white right-4 bottom-20 md:hidden"
      >
        <Plus strokeWidth={1.5} size={30} />
      </div>
    </>
  );
};

export default PostInput;
