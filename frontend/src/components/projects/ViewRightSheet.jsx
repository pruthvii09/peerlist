import React from "react";
import { Link } from "react-router-dom";
import Badge from "../../assets/icons/Badge";

const ViewRightSheet = ({ project }) => {
  return (
    <div>
      <div className="mt-8 flex flex-col gap-4 px-6">
        <div className="flex flex-col">
          <div className="flex flex-col gap-6">
            <h1 className="text-sm font-semibold">Project By</h1>
            <Link
              to={`/user/${project?.user.username}`}
              className="flex items-start gap-2 group-[]:"
            >
              <div className="relative">
                <img
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded-full"
                  src={project?.user.profileImageUrl}
                  alt=""
                />
                {project?.user.emailVerified && (
                  <div className="absolute flex h-4 w-4 bg-white items-center justify-center rounded-full bottom-0 right-0">
                    <Badge size={12} />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <h1 className="font-semibold text-sm group-hover:underline">
                  {project?.user.firstname} {project?.user.lastname}
                </h1>
                <p className="text-xs text-[#6a737d] paragraph-clamp">
                  {project?.user.bio}
                </p>
              </div>
            </Link>
            {project?.collaborators?.map((user) => (
              <Link
                to={`/user/${user.username}`}
                className="flex items-start gap-2 group-[]:"
              >
                <div className="relative">
                  <img
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded-full"
                    src={user.profileImageUrl}
                    alt=""
                  />
                  {user.emailVerified && (
                    <div className="absolute flex h-4 w-4 bg-white items-center justify-center rounded-full bottom-0 right-0">
                      <Badge size={12} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <h1 className="font-semibold text-sm group-hover:underline">
                    {user.firstname} {user.lastname}
                  </h1>
                  <p className="text-xs text-[#6a737d] paragraph-clamp">
                    {user.bio}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {project?.skills.length > 0 && (
          <div className="mt-8">
            <h1 className="text-sm font-semibold">Built using</h1>
            {project?.skills && (
              <div className="flex items-start justify-start mt-3 gap-2 flex-wrap">
                {project?.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center text-xs gap-1 px-3 py-1 border border-gray-200 rounded-full"
                  >
                    <img
                      height={16}
                      width={16}
                      className="w-4 h-4"
                      src={skill.logo}
                      alt=""
                    />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRightSheet;
