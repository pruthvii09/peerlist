import { Share2, Star } from "lucide-react";
import React from "react";

const GitProjectCard = ({ project }) => {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border border-gray-300 rounded-lg hover:shadow-lg no-underline text-inherit"
    >
      <div className="flex flex-col">
        <p className="font-normal text-sm">
          pruthvii09/<span className="font-semibold">{project.name}</span>
        </p>
        <p className="paragraph-clamp text-xs text-gray-700">
          {project.description}
        </p>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500">
          <span className="text-[10px]">Javascript</span>
          <div className="flex items-center gap-1">
            <Star size={15} />
            <span className="text-[12px]">{project.stargazerCount}</span>
          </div>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="p-1 border border-gray-300 rounded-full"
        >
          <Share2 size={16} />
        </div>
      </div>
    </a>
  );
};

export default GitProjectCard;
