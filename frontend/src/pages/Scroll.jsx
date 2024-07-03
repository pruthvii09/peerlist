import React from "react";
import Sidebar from "../components/utils/Sidebar";
import { SlidersHorizontal } from "lucide-react";
import ComponentHeader from "../components/utils/ComponentHeader";
import Post from "../components/scroll/Post";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";

const Scroll = () => {
  return (
    <Sidebar>
      <div className="flex">
        <div className="sm:w-[640px] w-full">
          <ComponentHeader
            title="Scroll"
            iconConfig={{ icon: SlidersHorizontal }}
          />
          <Post />
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

export default Scroll;
