import { ArrowBigUp, Bookmark, MessageSquare } from "lucide-react";
import React from "react";

const ProjectCard = ({ data, rank }) => {
  return (
    <div className="px-4 group/project py-4 mt-2 w-full hover:bg-[#F8FAFB]  flex items-center justify-between">
      <div className="flex items-center gap-2">
        <p className="text-gray-600 text-xs">#{rank + 1}</p>
        <img
          height={63}
          width={120}
          className="border border-gray-300 rounded-md h-16 w-32"
          loading="lazy"
          src={data?.images[0]}
          alt=""
        />
        <div>
          <h1 className="text-sm group-hover/project:underline font-semibold">
            {data?.title}
          </h1>
          <p className="text-xs paragraph-clamp break-all sm:block hidden">
            {data?.tagline}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MessageSquare size={15} strokeWidth={1.5} />
              <span className="text-xs font-mono font-semibold text-gray-600">
                {data?.commentCount}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Bookmark size={15} strokeWidth={1.5} />
              <span className="text-xs font-mono font-semibold text-gray-600">
                {data?.bookmarkCount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex group flex-col px-3 py-1 items-center border border-gray-300 rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-200">
        <div className="w-6 group-hover:bg-[#E2F5EA] group-hover:text-[#00AA45] flex items-center h-6 rounded-full">
          <ArrowBigUp strokeWidth={1.25} size={26} />
        </div>
        <span className="font-mono text-xs font-semibold text-gray-500">
          {data?.upvotesCount}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
