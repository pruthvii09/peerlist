import React from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import { ArrowLeft } from "lucide-react";
import EditComponent from "../components/profile/EditComponent";
import GradientCard2 from "../components/utils/GradientCard2";
import { useSelector } from "react-redux";
const EditProfile = () => {
  const { user } = useSelector((store) => store.user);
  return (
    <Sidebar>
      <div className="flex">
        <div className="sm:w-[640px] w-full">
          <ComponentHeader
            title="Edit Profile"
            iconConfig={{ icon: ArrowLeft }}
            href={`/user/${user.username}`}
          />
          <EditComponent />
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

export default EditProfile;
