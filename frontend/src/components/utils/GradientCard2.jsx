import React from "react";
import Button from "./ui/Button";
import { ArrowRight } from "lucide-react";

const GradientCard2 = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(215deg, rgba(0, 170, 69, 0.2) 0%, rgba(255, 255, 255, 0) 49.92%)",
      }}
      className="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 items-center"
    >
      <img
        src="https://dqy38fnwh4fqs.cloudfront.net/website/project-spotlight/all-3-medals-with-leaves.svg"
        alt=""
      />
      <h1 className="text-2xl font-instrumentic font-normal">
        What is Project Spotlight?
      </h1>
      <div className="flex items-center flex-col gap-4 text-sm">
        <p className="text-center">
          Project Spotlight by PeerHub is a weekly launchpad for your side
          projects to get early users, and collect feedback from fellow
          developers and designers!
        </p>
        <p className="text-center">
          Top 3 projects will get a shiny badge on their profile, feature in our
          newsletter, and PeerHub merch
        </p>
        <p className="text-center">
          Launch opens every Monday from 12:00am to 11:59pm UTC.
        </p>
      </div>
      <Button
        title="Join PeerHub"
        className="bg-[#00aa45] text-white border-2 mt-3 border-[#219653] rounded-full text-sm px-3.5 py-0.5 hover:bg-[#219653]"
      />
    </div>
  );
};

export default GradientCard2;
