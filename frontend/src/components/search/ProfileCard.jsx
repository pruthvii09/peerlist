import React from "react";
import Button from "../utils/ui/Button";

const ProfileCard = () => {
  return (
    <div className="relative -z-30 hover:bg-[#FAFBFC] group flex border border-gray-300 w-fit items-start flex-col p-4 rounded-lg">
      <img
        height={40}
        width={40}
        className="rounded-full"
        src="https://avatars.githubusercontent.com/u/101882373?v=4"
        alt=""
      />
      <h1 className="text-sm font-semibold group-hover:underline">
        Pruthviraj Auti
      </h1>
      <p className="text-gray-600 text-xs paragraph-clamp">
        Campus Placement Team @ Ambedkar DSEU | Programming Languages, C, Data
        Analysis
      </p>
      <Button
        className="absolute right-4 text-white font-medium bg-black rounded-full text-xs px-2 py-1"
        title="Follow"
      />
    </div>
  );
};

export default ProfileCard;
