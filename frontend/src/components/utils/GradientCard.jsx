import React from "react";
import Button from "./ui/Button";
import { ArrowRight } from "lucide-react";

const GradientCard = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(245deg, rgba(47, 128, 237, 0.2) 0%, rgba(255, 255, 255, 0) 65.72%), rgb(255, 255, 255)",
      }}
      className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 items-center"
    >
      <h1 className="text-2xl font-instrumentic font-normal">
        Are you Hiring?
      </h1>
      <p className="text-center text-sm text-[#444d56]">
        With PeerHub, the average time for posting a job to handing out an offer
        is less than 2 weeks!
      </p>
      <Button
        title="Post a Job"
        className="bg-[#00aa45] text-white border-2 mt-3 border-[#219653] rounded-full text-sm px-3.5 py-0.5 hover:bg-[#219653]"
        iconConfig={{ icon: ArrowRight }}
      />
      <p className="text-xs text-gray-400 italic">Start with free job post</p>
    </div>
  );
};

export default GradientCard;
