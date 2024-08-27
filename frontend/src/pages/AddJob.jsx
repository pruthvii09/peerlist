import React from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import { ArrowLeft } from "lucide-react";
import GradientCard2 from "../components/utils/GradientCard2";
import { useSelector } from "react-redux";
import JobDetails from "../components/job/JobDetails";
const AddJob = () => {
  const { user } = useSelector((store) => store.user);
  return (
    <Sidebar>
      <div className="flex">
        <div className="md:w-[640px] w-full">
          <ComponentHeader
            title="Add Job"
            iconConfig={{ icon: ArrowLeft }}
            href={`/user/${user.username}`}
          />
          <JobDetails />
        </div>
        <Rightsidebar>
          <div className="mt-8 flex flex-col gap-4 px-6">
            <GradientCard />
            <GradientCard2 />
          </div>
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default AddJob;
