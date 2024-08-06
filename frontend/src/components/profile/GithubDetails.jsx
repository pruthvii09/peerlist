import { Trash2 } from "lucide-react";
import React from "react";
import Github from "../../assets/icons/Github";
import CalendarHeatmap from "react-calendar-heatmap";
// import Heatmap from "../utils/Heatmap";
import "react-calendar-heatmap/dist/styles.css";
import GitProjectCard from "./GitProjectCard";
import { useModal } from "../../context/ModalContext";
import { useRemoveGit } from "../../hooks/profile/useRemoveGit";
const GithubDetails = ({ isOwnProfile, github }) => {
  console.log("github => ", github);
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const processContributionData = (contributionCalendar) => {
    return contributionCalendar?.weeks.flatMap((week) =>
      week?.contributionDays.map((day) => ({
        date: formatDate(day.date),
        count: Math.min(4, day.contributionCount),
      }))
    );
  };

  const data = processContributionData(
    github?.contributionsCollection.contributionCalendar
  );
  const totalContributions = data?.reduce((sum, day) => sum + day.count, 0);
  const { showModal } = useModal();
  const removeGitMutation = useRemoveGit();
  const onConfirm = () => {
    removeGitMutation.mutate();
  };
  return (
    <div className="pb-24 w-full">
      <div className="flex px-4 items-center justify-between">
        <h1 className="flex items-center gap-2">
          <Github />
          <p className="font-semibold">Github</p>
        </h1>
        {isOwnProfile && (
          <div
            onClick={() =>
              showModal("confirm", {
                onConfirm: onConfirm,
                title: "Are you sure you want to remove github?",
              })
            }
            className="p-1 border border-gray-300 rounded-full cursor-pointer"
          >
            <Trash2 size={16} />
          </div>
        )}
      </div>
      <div className="mt-4 px-4 w-full">
        <p className="text-xs mb-2">
          <strong>{totalContributions} </strong>
          <span className="text-gray-600">Contributions in the last year</span>
        </p>
        <CalendarHeatmap
          startDate="2023-07-23"
          endDate="2024-07-24"
          values={data}
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-github-${value.count}`;
          }}
          transformDayElement={(rect, value, index) => {
            return React.cloneElement(rect, {
              rx: 2,
              width: 8,
              height: 8,
              fill: "#333",
            });
          }}
          tooltipDataAttrs={(value) => {
            return {
              title: `has count:`,
            };
          }}
          onClick={(value) =>
            alert(`Clicked on value with count: ${value.count}`)
          }
        />
        <div className="mt-4">
          <span className="text-xs">
            Total <strong>{github?.repositories?.totalCount}</strong>{" "}
            repositories
          </span>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {github?.pinnedItems?.nodes.map((project, i) => (
              <GitProjectCard project={project} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubDetails;
