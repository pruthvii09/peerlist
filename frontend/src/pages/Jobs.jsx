import React from "react";
import Sidebar from "../components/utils/Sidebar";
import { Settings } from "lucide-react";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import JobCard from "../components/jobs/JobCard";
import GradientCard2 from "../components/utils/GradientCard2";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const navigate = useNavigate();
  return (
    <Sidebar>
      <div className="flex">
        <div className="sm:w-[640px] w-full">
          <ComponentHeader
            title="All Jobs"
            iconConfig={{ icon: Settings, text: "Job Preferences" }}
            onIconClick={() => navigate(`/id/job-preference`)}
          />
          <div className="mt-14 flex flex-col border-r border-gray-300">
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
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

export default Jobs;
