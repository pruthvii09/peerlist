import React, { useState } from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import { Menu, X } from "lucide-react";
import EditComponent from "../components/settings/EditComponent";
import EditRightbar from "../components/profile/EditRightbar";
const EditProfile = () => {
  const [showSheet, setShowSheet] = useState(false);
  return (
    <Sidebar>
      <div className="flex">
        <div className="md:w-[640px] w-full">
          <ComponentHeader
            title="Edit Profile"
            children={
              <div className="block md:hidden">
                {showSheet ? (
                  <div
                    onClick={() => setShowSheet(!showSheet)}
                    className="px-2 cursor-pointer py-2 border border-gray-300 rounded-full flex items-center gap-1 h-[36px]"
                  >
                    <X size={18} />
                  </div>
                ) : (
                  <div
                    onClick={() => setShowSheet(!showSheet)}
                    className="px-2 cursor-pointer py-2 border border-gray-300 rounded-full flex items-center gap-1 h-[36px]"
                  >
                    <Menu size={18} />
                  </div>
                )}
              </div>
            }
          />
          <EditComponent />
        </div>
        <Rightsidebar>
          <div className="mt-8 flex flex-col gap-4">
            <EditRightbar active="Profile" />
          </div>
        </Rightsidebar>
      </div>
      {showSheet && <EditRightbar setShowSheet={setShowSheet} />}
    </Sidebar>
  );
};

export default EditProfile;
