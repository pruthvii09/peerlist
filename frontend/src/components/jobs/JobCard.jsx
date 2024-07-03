import React from "react";

const JobCard = () => {
  return (
    <div className="sm:px-8 px-2 w-full cursor-pointer hover:bg-[#F8FAFB] py-6 flex items-start gap-2">
      <div className="px-2 py-2 border border-gray-300 rounded-2xl">
        <img
          width={40}
          height={40}
          className="rounded-full"
          src="https://logo.clearbit.com/arcanys.com"
          alt=""
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm">
          <span className="font-semibold">Senior Backend Enginner</span> at
          Avara
        </p>
        <p className="text-xs text-gray-600">
          Remote (United States)&nbsp;•&nbsp;Full-time&nbsp;•&nbsp;5+ years
        </p>
        <div className="mt-2 sm:flex hidden gap-3">
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
    </div>
  );
};

export default JobCard;
