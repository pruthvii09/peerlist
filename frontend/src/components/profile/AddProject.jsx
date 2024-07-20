import { Box, Edit, Loader2, Plus } from "lucide-react";
import React from "react";
import Button from "../utils/ui/Button";
import { Link, useNavigate } from "react-router-dom";

const AddProject = ({ projects, isOwnProfile }) => {
  const navigate = useNavigate();
  return (
    <div className="pb-16 ">
      <div className="flex py-10 px-4 items-center justify-between">
        <h1 className="flex items-center font-semibold gap-2">
          <Box strokeWidth={1.25} size={35} />
          My Projects
        </h1>
        {isOwnProfile && (
          <Button
            title="Add project"
            onClick={() => navigate("/projects/add-project")}
            className="text-white font-medium bg-black rounded-full text-xs px-2 py-1"
            iconConfig={{ icon: Plus, size: 16 }}
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 px-4">
        {projects?.map((project) => (
          <Link
            to={
              !isOwnProfile
                ? `/projects/view/${project.id}`
                : `/projects/edit-project/${project.id}`
            }
            key={project.id}
            className="flex group group-hover:shadow-2xl cursor-pointer flex-col border border-gray-300 rounded-lg"
          >
            <img
              src="https://peerlist.io/images/emptyPortfolio.png"
              height={150}
              className="object-fill"
              alt=""
            />
            <div className="p-4 flex flex-col">
              <h1 className="font-semibold text-sm">{project.title}</h1>
              <div className="flex items-center justify-between pt-2">
                <img
                  height={24}
                  width={24}
                  className="rounded-full"
                  src={project?.user?.profileImageUrl}
                  alt=""
                />
                {isOwnProfile && (
                  <div>
                    <Edit size={18} />
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AddProject;
