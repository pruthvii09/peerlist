import React from "react";
import Sidebar from "../components/utils/Sidebar";
import { Bell, Loader2, Settings } from "lucide-react";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import JobCard from "../components/jobs/JobCard";
import GradientCard2 from "../components/utils/GradientCard2";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetchJob from "../hooks/job/useGetJob";
const Jobs = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const { data, isLoading } = useFetchJob();
  console.log("data => ", data);
  return (
    <Sidebar>
      <div className="flex">
        <div className="md:w-[640px] w-full">
          <ComponentHeader
            title="All Jobs"
            iconConfig={{ icon: Settings, text: "Job Preferences" }}
            onIconClick={() =>
              navigate(`/${user.username}/settings/job-preference`)
            }
            children={
              <Link
                to={"/notifications"}
                // onClick={onIconClick}
                className="px-2 cursor-pointer py-2 border border-gray-300 rounded-full flex md:hidden items-center gap-1 h-[36px]"
              >
                <Bell size={18} />
              </Link>
            }
          />
          <div className="mt-14 flex flex-col border-r border-gray-300 min-h-screen h-full">
            {isLoading ? (
              <div>
                <Loader2 className="animate-spin text-green-500" />
              </div>
            ) : (
              <>
                {data.map((job) => (
                  <JobCard job={job} key={job?.id} />
                ))}
              </>
            )}
          </div>
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

export default Jobs;
