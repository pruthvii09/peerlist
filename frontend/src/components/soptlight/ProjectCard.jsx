import { Check } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectCard = ({ data, isSelected, onSelect }) => {
  const isSpotlight = data?.spotlightLaunchedAt !== null;
  return (
    <div
      onClick={() => !isSpotlight && onSelect()}
      className={`px-4 py-4 mt-2 w-full flex items-center justify-between ${
        isSpotlight ? "cursor-not-allowed" : "group/project hover:bg-[#F8FAFB]"
      }`}
    >
      <div className="flex items-center gap-2">
        <img
          height={63}
          width={120}
          className="border border-gray-300 rounded-md h-16 w-32"
          loading="lazy"
          src="https://peerlist.io/images/emptyPortfolio.png"
          alt=""
        />
        <div>
          <h1
            className={`text-sm font-semibold ${
              !isSpotlight && "group-hover/project:underline"
            }`}
          >
            {data?.title}
          </h1>
          <p className="text-xs paragraph-clamp break-all md:block hidden">
            {data?.tagline}
          </p>
        </div>
      </div>
      <motion.div
        className={`h-6 w-6 border flex items-center justify-center border-gray-300 rounded-full overflow-hidden ${
          isSelected ? "bg-green-500" : "group-hover/project:border-green-600"
        }`}
        animate={{
          scale: isSelected ? 1.1 : 1,
          transition: { type: "spring", stiffness: 500, damping: 30 },
        }}
      >
        <AnimatePresence>
          {isSelected && (
            <div>
              <Check size={16} className="text-white" />
            </div>
          )}
        </AnimatePresence>
        {!isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-4 h-4 rounded-full bg-white group-hover/project:bg-green-600"
          />
        )}
      </motion.div>
    </div>
  );
};

export default ProjectCard;
