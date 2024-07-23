import React, { useState } from "react";
import { Link } from "react-router-dom";
import Upvote from "../../assets/Upvote";
import { motion } from "framer-motion";
import { useAddUpvote } from "../../hooks/spotlight/useUpvote";

const ProjectCard = ({ data, rank }) => {
  const [upvote, setUpvoted] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const upvoteMutation = useAddUpvote();
  const handleClick = (e) => {
    e.preventDefault();
    upvoteMutation.mutate({ projectId: data?.id });
    setUpvoted(!upvote);
    setAnimationKey((prev) => prev + 1);
  };
  return (
    <Link
      to={`/projects/view/${data?.id}`}
      className="px-4 group/project py-4 mt-2 w-full hover:bg-[#F8FAFB]  flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <p className="text-gray-600 text-xs">#{rank + 1}</p>
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
          <p className="text-xs paragraph-clamp break-all sm:block hidden">
            {data?.tagline}
          </p>
        </div>
      </div>
      <div
        onClick={handleClick}
        className="flex group flex-col px-3 py-1 items-center border border-gray-300 rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-200"
      >
        <motion.div
          key={animationKey}
          className="group-hover:bg-[#E2F5EA] group-hover:text-[#00AA45] flex items-center p-2 rounded-full"
          initial={{ y: 0 }}
          animate={upvote ? { y: [-0, -10, -0], scale: [1, 1.2, 1] } : { y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Upvote setUpvoted={setUpvoted} upvote={upvote} />
        </motion.div>
        <motion.span
          className="font-mono text-xs font-semibold text-gray-500"
          animate={{ scale: upvote ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          {data?.upvotes}
        </motion.span>
      </div>
    </Link>
  );
};

export default ProjectCard;
