import React from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import { ChevronDown } from "lucide-react";
import ProfileCard from "../components/search/ProfileCard";

const Search = () => {
  return (
    <Sidebar>
      <div className="flex">
        <div className="sm:w-[640px] w-full">
          <ComponentHeader title="Search" iconConfig={{ icon: ChevronDown }} />
          <div className="mt-14 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-r border-gray-300">
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
          </div>
        </div>
        <Rightsidebar>
          <div className="mt-8 border-r">
            <GradientCard />
          </div>
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default Search;
