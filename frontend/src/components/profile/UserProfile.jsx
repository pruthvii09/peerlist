import { Link, MapPin, UserRoundCog } from "lucide-react";
import React from "react";

const UserProfile = () => {
  return (
    <div className="py-10 mt-14 px-4 flex flex-col sm:items-center items-start gap-4">
      <img
        height={80}
        width={80}
        className="rounded-full"
        src="https://avatars.githubusercontent.com/u/101882373?v=4"
        alt=""
      />
      <div className="flex items-center flex-col  gap-2">
        <h1 className="font-semibold text-lg">Pruthviraj Auti</h1>
        <p className="text-sm">Full Stack Developer</p>
      </div>
      <div className="flex items-center flex-wrap gap-4">
        <span className="flex items-center text-xs">
          <UserRoundCog size={16} strokeWidth={1.5} className="mr-1" />
          Member since Jan 2023
        </span>
        <span className="flex items-center text-xs">
          <MapPin size={16} strokeWidth={1.5} className="mr-1" />
          Remote
        </span>
        <span className="flex items-center text-xs hover:underline cursor-pointer">
          <Link size={16} strokeWidth={1.5} className="mr-1" />
          portfoliobuilderprut...
        </span>
      </div>
      <div className="mt-2 flex flex-wrap sm:items-center items-start sm:justify-center justify-start gap-3">
        <p className="px-2 py-1 text-xs border border-gray-300 w-fit rounded-full">
          NodeJs
        </p>
        <p className="px-2 py-1 text-xs border border-gray-300 w-fit rounded-full">
          NodeJs
        </p>
        <p className="px-2 py-1 text-xs border border-gray-300 w-fit rounded-full">
          NodeJs
        </p>
        <p className="px-2 py-1 text-xs border border-gray-300 w-fit rounded-full">
          NodeJs
        </p>
        <p className="px-2 py-1 text-xs border border-gray-300 w-fit rounded-full">
          NodeJs
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
