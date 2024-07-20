import { ArrowUpRight, Bookmark, Share } from "lucide-react";
import React from "react";
import Button from "../utils/ui/Button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ViewProjectDetails = ({ project, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-14 border-r h-full border-gray-300">
        <div className="px-6 py-4 border-b border-gray-300">
          <Skeleton height={28} width={200} />
          <Skeleton height={20} width={150} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="px-4 pt-6">
            <Skeleton height={200} width={"100%"} />
          </div>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex gap-4">
              <Skeleton circle height={40} width={40} />
              <Skeleton circle height={40} width={40} />
            </div>
            <Skeleton height={36} width={100} />
          </div>
          <div className="px-6 py-4">
            <Skeleton count={5} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-14 border-r h-full border-gray-300">
      <div>
        <div className="px-6 py-4 border-b border-gray-300">
          <h1 className="font-semibold text-lg">{project.title}</h1>
          <p className="text-sm">{project.tagline}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="px-4 pt-6">
            <img
              className="rounded-lg"
              src={
                project.imageUrl ||
                "https://peerlist.io/images/emptyPortfolio.png"
              }
              alt={project.title}
            />
          </div>
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex gap-4">
              <div className="px-1 py-1 rounded-full border border-gray-300 w-fit">
                <Bookmark size={18} strokeWidth={1.5} />
              </div>
              <div className="px-1 py-1 rounded-full border border-gray-300 w-fit">
                <Share size={18} strokeWidth={1.5} />
              </div>
            </div>
            <Button
              title="Visit"
              className="text-white font-medium bg-black rounded-full text-sm px-4 py-1.5"
              iconConfig={{ icon: ArrowUpRight }}
            />
          </div>
          <div className="px-6 py-4">
            <p dangerouslySetInnerHTML={{ __html: project.description }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProjectDetails;
