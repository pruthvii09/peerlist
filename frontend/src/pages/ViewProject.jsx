import React from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import ViewProjectDetails from "../components/projects/ViewProjectDetails";
import useProjectById from "../hooks/projects/useGetProject";
import { Link, useParams } from "react-router-dom";
const ViewProject = () => {
  const { user } = useSelector((store) => store.user);
  const { id } = useParams();
  const { data, isLoading } = useProjectById(id);
  const project = data?.data;
  return (
    <Sidebar>
      <div className="flex">
        <div className="sm:w-[640px] w-full">
          <ComponentHeader
            title="View Project"
            iconConfig={{ icon: ArrowLeft }}
            href={`/user/${user.username}`}
          />
          <ViewProjectDetails project={project} isLoading={isLoading} />
        </div>
        <Rightsidebar>
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col">
              <div className="flex flex-col gap-6">
                <h1 className="text-sm font-semibold">Project By</h1>
                <Link
                  to={`/user/${project?.user.username}`}
                  className="flex items-start gap-2 group-[]:"
                >
                  <img
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded-full"
                    src={project?.user.profileImageUrl}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-sm group-hover:underline">
                      {project?.user.firstname} {project?.user.lastname}
                    </h1>
                    <p className="text-xs text-[#6a737d] paragraph-clamp">
                      {project?.user.bio}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default ViewProject;
