import React from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectCard from "../components/projects/ProjectCard";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import GradientCard2 from "../components/utils/GradientCard2";
import useGetSpotlight from "../hooks/spotlight/useGetSpotlight";
import NoData from "../assets/nodata.svg";
import { ArrowRight, Bell, CircleHelp, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { formatDateRange } from "../utils/functions";
import Button from "../components/utils/ui/Button";
import { useModal } from "../context/ModalContext";
const Project = () => {
  const { week } = useParams();
  const { showModal } = useModal();
  const { data, isLoading } = useGetSpotlight(week);
  const dateRange = formatDateRange(data?.startDate, data?.endDate);
  return (
    <Sidebar>
      <div className="flex">
        <div className="w-full">
          <div className="md:w-[640px] w-full ">
            <ComponentHeader
              title="Projects Spotlight"
              iconConfig={{ icon: CircleHelp }}
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
          </div>
          <div className="md:w-[640px] w-full border-r border-gray-300 pb-24 max-h-full min-h-screen ">
            <ProjectHeader
              currentWeek={data?.weekNumber}
              dateRange={dateRange}
            />
            {isLoading ? (
              <div>
                <Loader2 className="text-green-600 animate-spin" />
              </div>
            ) : (
              <>
                {data?.projects.length <= 0 ? (
                  <div className="w-full flex flex-col items-center justify-center">
                    <img src={NoData} height={400} width={400} alt="" />
                    <div className="flex items-center justify-center gap-2 flex-col">
                      <p className="text-sm text-gray-700">
                        No Projects Launched Yet
                      </p>
                      <Button
                        title="Lauch"
                        onClick={() => showModal("launchproject")}
                        iconConfig={{ icon: ArrowRight }}
                        className="bg-[#00aa45] text-white border-2 border-[#219653] rounded-full px-3.5 py-0.5 hover:bg-[#219653] "
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {data?.projects?.map((project, i) => (
                      <ProjectCard data={project} key={project.id} rank={i} />
                    ))}
                  </>
                )}
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

export default Project;
