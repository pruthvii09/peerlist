import React from "react";
import Button from "../utils/ui/Button";
import { Rocket } from "lucide-react";
import { useModal } from "../../context/ModalContext";
// import WeekSelector from "./WeekSelector";

const ProjectHeader = ({ currentWeek, dateRange }) => {
  const { showModal } = useModal();
  const today = new Date().getDay();
  const isMonday = today === 3;

  return (
    <>
      {/* <WeekSelector currentWeek={currentWeek} /> */}

      <div className="flex mt-[55px]  sm:flex-row flex-col sm:items-center items-start justify-between sm:gap-8 gap-1 px-6 py-2">
        <div>
          <h1 className="font-instrumentic text-2xl">Week {currentWeek}</h1>
          <p className="text-xs">{dateRange}</p>
        </div>
        <p className="text-xs sm:text-end text-start text-gray-600">
          Support the best projects with your feedback & upvotes. <br /> You can
          launch your project on Monday, next week.
        </p>
      </div>
      {isMonday && (
        <div className="px-6 py-2">
          <Button
            title="Launch Project"
            onClick={() => showModal("launchproject")}
            className="text-sm font-semibold border border-gray-300 px-4 py-1 rounded-full hover:bg-gray-100"
            iconConfig={{ icon: Rocket }}
          />
        </div>
      )}
    </>
  );
};

export default ProjectHeader;
