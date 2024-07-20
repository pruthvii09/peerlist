import React from "react";
import Sidebar from "../components/utils/Sidebar";
import { SlidersHorizontal } from "lucide-react";
import ComponentHeader from "../components/utils/ComponentHeader";
import Post from "../components/scroll/Post";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import GradientCard2 from "../components/utils/GradientCard2";
import { useModal } from "../context/ModalContext";

const Scroll = () => {
  const { showModal } = useModal();
  const handleIconClick = () => {
    showModal("preference");
  };
  return (
    <Sidebar>
      <div className="flex">
        <div className="sm:w-[640px] w-full">
          <ComponentHeader
            title="Scroll"
            iconConfig={{ icon: SlidersHorizontal }}
            onIconClick={handleIconClick}
          />
          <Post />
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

export default Scroll;
