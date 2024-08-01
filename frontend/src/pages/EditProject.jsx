import React, { useEffect, useState } from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import EditProjectComponent from "../components/profile/EditProjectComponent";
import { useParams } from "react-router-dom";
import useProjectById from "../hooks/projects/useGetProject";
import ProjectProgress from "../components/projects/ProjectProgress";
const EditProject = () => {
  const { id } = useParams();
  const { user } = useSelector((store) => store.user);
  const { data: project, isLoading } = useProjectById(id);
  const [projectData, setProjectData] = useState({
    title: project?.data?.title || "",
    tagline: project?.data?.tagline || "",
    description: project?.data?.description || "",
    projectLink: project?.data?.projectLink || "",
    skills: project?.data?.skills || [],
    collaborators: project?.data?.collaborators || [],
    opensource: project?.data?.opensource || false,
  });
  useEffect(() => {
    if (project) {
      setProjectData((prevData) => ({
        ...prevData,
        title: project?.data?.title || "",
        tagline: project?.data?.tagline || "",
        description: project?.data?.description || "",
        skills: project?.data?.skills || [],
        collaborators: project?.data?.collaborators || [],
        projectLink: project?.data?.projectLink || "",
        opensource: project?.data?.opensource || false,
      }));
    }
  }, [project]);
  return (
    <Sidebar>
      <div className="flex">
        <div className="md:w-[640px] w-full">
          <ComponentHeader
            title="Edit Project"
            iconConfig={{ icon: ArrowLeft }}
            href={`/user/${user.username}`}
          />
          <EditProjectComponent
            projectData={projectData}
            setProjectData={setProjectData}
            isLoading={isLoading}
          />
        </div>
        <Rightsidebar>
          <div className="mt-8 flex flex-col gap-4 px-6">
            <ProjectProgress projectData={projectData} />
          </div>
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default EditProject;
