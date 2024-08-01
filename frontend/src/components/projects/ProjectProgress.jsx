import { Check, Lightbulb } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
const ProjectProgress = ({ projectData }) => {
  const calculateCompletion = () => {
    const fields = ["title", "tagline", "description", "projectLink", "skills"];
    const filledFields = fields.filter((field) => {
      if (Array.isArray(projectData[field])) {
        // Check if the array is not empty
        return projectData[field].length > 0;
      } else {
        // Check if the string field is not empty
        return projectData[field].trim() !== "";
      }
    });
    return (filledFields.length / fields.length) * 100;
  };
  const percent = calculateCompletion();
  let bgColor;
  if (percent <= 25) {
    bgColor = "bg-red-500";
  } else if (percent <= 50) {
    bgColor = "bg-yellow-500";
  } else if (percent <= 75) {
    bgColor = "bg-green-500";
  } else {
    bgColor = "bg-green-700";
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-normal">{calculateCompletion()}%</h1>
        <p className="text-xs font-semibold mb-1">Project Details Completion</p>
        <div className="h-1 bg-[#e1e4e8] rounded relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full ${bgColor} rounded`}
            style={{ width: `${percent}%` }}
          ></motion.div>
        </div>
        <p className="font-normal text-xs mt-2 text-gray-600">
          Complete 100% of your project details to make it eligible for
          launching on Project Spotlight.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <div
            className={`h-4 w-4 flex items-center justify-center rounded-full border ${
              projectData.title
                ? "bg-green-600 border-green-800"
                : "border-gray-600"
            } `}
          >
            {projectData.title && <Check size={12} className="text-white" />}
          </div>
          <span className="text-xs">Project Name</span>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className={`h-4 w-4 flex items-center justify-center rounded-full border ${
              projectData.tagline
                ? "bg-green-600 border-green-800"
                : "border-gray-600"
            } `}
          >
            {projectData.tagline && <Check size={12} className="text-white" />}
          </div>
          <span className="text-xs">Project Tagline</span>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className={`h-4 w-4 flex items-center justify-center rounded-full border ${
              projectData.projectLink
                ? "bg-green-600 border-green-800"
                : "border-gray-600"
            } `}
          >
            {projectData.projectLink && (
              <Check size={12} className="text-white" />
            )}
          </div>
          <span className="text-xs">Project URL</span>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className={`h-4 w-4 flex items-center justify-center rounded-full border ${
              projectData.skills.length >= 3
                ? "bg-green-600 border-green-800"
                : "border-gray-600"
            } `}
          >
            {projectData.skills?.length >= 3 && (
              <Check size={12} className="text-white" />
            )}
          </div>
          <span className="text-xs">Skills Used</span>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className={`h-4 w-4 flex items-center justify-center rounded-full border ${
              projectData.description
                ? "bg-green-600 border-green-800"
                : "border-gray-600"
            } `}
          >
            {projectData.description && (
              <Check size={12} className="text-white" />
            )}
          </div>
          <span className="text-xs">Project Description</span>
        </div>
      </div>
      <div>
        <div className="flex gap-2 items-center">
          <Lightbulb size={20} />
          <h1 className="text-sm font-semibold">Tips</h1>
        </div>
        <ul className="list-disc mt-4 pl-5 flex flex-col gap-2">
          <li className="font-normal text-xs text-gray-600">
            You can add your side projects, case studies, product teardowns, and
            much more.
          </li>
          <li className="font-normal text-xs text-gray-600">
            Your <strong>project tagline</strong> should be super short (but
            compelling!) description — like an overview of the project one short
            sentence.
          </li>
          <li className="font-normal text-xs text-gray-600">
            <strong>Add collabrators</strong> who worked with you and
            contributed to this.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectProgress;
