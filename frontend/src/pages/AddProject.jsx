import React, { useState } from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import { ArrowLeft } from "lucide-react";
import ProjectDetails from "../components/profile/ProjectDetails";
import { useSelector } from "react-redux";
import ProjectProgress from "../components/projects/ProjectProgress";
const AddProject = () => {
  const { user } = useSelector((store) => store.user);
  const [projectData, setProjectData] = useState({
    title: "",
    tagline: "",
    description: "",
    projectLink: "",
    opensource: false,
  });

  return (
    <Sidebar>
      <div className="flex">
        <div className="md:w-[640px] w-full">
          <ComponentHeader
            title="Add Project"
            iconConfig={{ icon: ArrowLeft }}
            href={`/user/${user.username}`}
          />
          <ProjectDetails
            projectData={projectData}
            setProjectData={setProjectData}
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

export default AddProject;
