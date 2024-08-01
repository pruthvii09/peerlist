import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Upvote from "../../assets/icons/Upvote";
import { motion } from "framer-motion";
import { useAddUpvote } from "../../hooks/spotlight/useUpvote";
import { useRemoveUpvote } from "../../hooks/spotlight/useRemoveUpvote";
import { useSelector } from "react-redux";
import { useModal } from "../../context/ModalContext";

const ProjectCard = ({ data, rank }) => {
  const [animationKey, setAnimationKey] = useState(0);
  const [upvote, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(data?.upvotes || 0);
  const { user } = useSelector((store) => store.user);
  const upvoteMutation = useAddUpvote();
  const removeUpvoteMutation = useRemoveUpvote();
  const { showModal } = useModal();
  useEffect(() => {
    const hasUpvoted = data?.allupvotes?.some(
      (upvote) => upvote.userId === user?.id
    );
    setUpvoted(hasUpvoted);
  }, [data, user?.id]);

  const handleClick = (e) => {
    e.preventDefault();

    if (!user) {
      showModal("login");
    } else {
      if (upvote) {
        setUpvoted(false);
        setUpvoteCount((prev) => prev - 1);
        removeUpvoteMutation.mutate({ projectId: data?.id });
      } else {
        setUpvoted(true);
        setUpvoteCount((prev) => prev + 1);
        setAnimationKey((prev) => prev + 1);
        upvoteMutation.mutate({ projectId: data?.id });
      }
    }
  };

  return (
    <Link
      to={`/projects/view/${data?.id}`}
      className="px-4 group/project py-4 mt-2 w-full hover:bg-[#F8FAFB] flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        {rank != null && <p className="text-gray-600 text-xs">#{rank + 1}</p>}
        <img
          height={63}
          width={120}
          className="border border-gray-300 rounded-md h-16 w-32"
          loading="lazy"
          src="https://peerlist.io/images/emptyPortfolio.png"
          alt=""
        />
        <div>
          <h1 className="text-sm group-hover/project:underline font-semibold">
            {data?.title}
          </h1>
          <p className="text-xs paragraph-clamp break-all md:block hidden">
            {data?.tagline}
          </p>
        </div>
      </div>
      <div
        onClick={handleClick}
        className={`flex group flex-col px-3 py-1 items-center border ${
          upvote ? "border-green-400" : "border-gray-300"
        } rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-200`}
      >
        <motion.div
          key={animationKey}
          className="group-hover:bg-[#E2F5EA] group-hover:text-[#00AA45] flex items-center p-2 rounded-full"
          initial={{ y: 0 }}
          animate={upvote ? { y: [-0, -10, -0], scale: [1, 1.2, 1] } : { y: 0 }}
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
    </Link>
  );
};

export default ProjectCard;
