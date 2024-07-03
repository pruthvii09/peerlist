import React from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import { Settings } from "lucide-react";
import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../utils/data";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import GradientCard2 from "../components/utils/GradientCard2";
const Project = () => {
  return (
    <Sidebar>
      <div className="flex">
        <div>
          <div className="sm:w-[640px] w-full">
            <ComponentHeader
              title="Projects Spotlight"
              iconConfig={{
                icon: Settings,
                size: 18,
              }}
            />
          </div>
          <div className="pt-14sm:w-[640px] w-full border-r border-gray-300">
            <ProjectHeader />
            {projects?.map((project, i) => (
              <ProjectCard data={project} key={project.id} rank={i} />
            ))}
          </div>
        </div>
        <Rightsidebar>
          <div className="mt-8 flex flex-col gap-4">
            <GradientCard />
            <GradientCard2 />
          </div>
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default Project;
