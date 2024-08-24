import React, { useEffect } from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import { Edit } from "lucide-react";
import { useSelector } from "react-redux";
import ViewProjectDetails from "../components/projects/ViewProjectDetails";
import useProjectById from "../hooks/projects/useGetProject";
import { useNavigate, useParams } from "react-router-dom";
import ViewRightSheet from "../components/projects/ViewRightSheet";
const ViewProject = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  const { id } = useParams();
  const { data, isLoading } = useProjectById(id);
  const project = data?.data;
  const isOwnProfile = user?.username === project?.user.username;
  return (
    <Sidebar>
      <div className="flex">
        <div className="md:w-[640px] w-full">
          <ComponentHeader
            title="View Project"
            children={
              <>
                {isOwnProfile && (
                  <div
                    onClick={() =>
                      navigate(`/projects/edit-project/${project?.id}`)
                    }
                    className="px-2 cursor-pointer py-2 border border-gray-300 rounded-full flex items-center gap-1 h-[36px]"
                  >
                    <Edit size={16} />
                  </div>
                )}
              </>
            }
          />
          <ViewProjectDetails project={project} isLoading={isLoading} />
        </div>
        <Rightsidebar>
          <ViewRightSheet project={project} />
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default ViewProject;
