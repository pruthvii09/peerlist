import React from "react";
import Button from "../utils/ui/Button";
import { Sparkles } from "lucide-react";

const HighlightCard = ({ user }) => {
  console.log("user", user);
  return (
    <div className="relative flex flex-col ">
      <div className="pb-8 border-t cursor-pointer group border-r border-l  rounded-2xl  border-gray-300 p-4">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={user?.profileImageUrl}
          alt=""
        />
        <h1 className="text-sm font-semibold mt-1 group-hover:underline">
          {user?.firstname} {user?.lastname}
        </h1>
        <p className="text-xs paragraph-clamp">{user?.bio}</p>
      </div>
      <Button
        title="Follow"
        className="absolute  top-4 right-4 text-xs bg-[#24292e] text-white px-4 py-1 rounded-full"
      />
      <div className="-mt-6">
        <div
          style={{
            background:
              "linear-gradient(204deg, rgba(209, 213, 218, 0.7) 0%, rgba(255, 255, 255, 0) 50.85%), rgb(255, 255, 255)",
          }}
          className="border p-4 border-gray-300 rounded-2xl"
        >
          <div className="flex items-center gap-2">
            <Sparkles size={18} />
            <h1 className="font-semibold text-sm">Profile Highlights</h1>
          </div>
          <div className="pl-5 mt-2">
            {user?.work.length > 0 ||
            user?.education.length > 0 ||
            user?.projects.length > 0 ? (
              <ul className="list-disc text-sm leading-5 flex flex-col gap-2">
                {user?.work.map((job, index) => (
                  <li key={index}>
                    {job.end_date === "Present" ? "Working at" : "Worked at"}{" "}
                    <strong>{job.company_name}</strong> as {job.title}
                  </li>
                ))}
                {user?.education.map((edu, index) => (
                  <li key={index}>
                    Completed {edu.degree} in {edu.study} from{" "}
                    <strong>{edu.institute_name}</strong>
                  </li>
                ))}
                {user?.projects.length > 0 && (
                  <li>
                    Has launched{" "}
                    <strong>{user?.projects.length} projects</strong> on PeerHub
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Nothing to show</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;
