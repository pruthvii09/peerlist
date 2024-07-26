// LaunchProject.js
import React, { useState } from "react";
import useProjects from "../../hooks/projects/useGetProjects";
import ProjectCard from "../soptlight/ProjectCard";
import Button from "../utils/ui/Button";
import { Loader2, X } from "lucide-react";
import { useModal } from "../../context/ModalContext";
import { useLaunchProjectMutation } from "../../hooks/spotlight/useLaunchProject";

const LaunchProject = () => {
  const { data, isLoading } = useProjects();
  const projects = data?.data;
  const { hideModal } = useModal();
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
  };
  const launchMutation = useLaunchProjectMutation();

  const handleLaunch = async () => {
    if (selectedId) {
      launchMutation.mutate(selectedId);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed hover:cursor-default inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
    >
      <div className="bg-white md:w-[600px] w-[600px] py-5 px-4 rounded-lg shadow-lg flex flex-col relative">
        <h1 className="text-base font-medium">Your Projects</h1>
        {isLoading ? (
          <div className="h-48 flex items-center justify-center">
            <Loader2 className="text-green-600 animate-spin" />
          </div>
        ) : (
          <>
            {projects?.map((project) => (
              <ProjectCard
                key={project.id}
                data={project}
                isSelected={selectedId === project.id}
                onSelect={() => handleSelect(project.id)}
              />
            ))}
          </>
        )}

        <div className="flex items-center justify-end pr-4">
          <Button
            onClick={handleLaunch}
            loading={launchMutation.isPending}
            className="bg-[#00aa45] text-xs text-white border-2 border-[#219653] rounded-full px-3.5 py-0.5 hover:bg-[#219653]"
            title="Launch"
          />
        </div>
        <div className="absolute top-3 right-3">
          <X
            onClick={() => {
              hideModal();
            }}
            className="cursor-pointer"
            size={18}
          />
        </div>
      </div>
    </div>
  );
};

export default LaunchProject;
