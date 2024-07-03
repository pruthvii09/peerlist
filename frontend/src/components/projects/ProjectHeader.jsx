import React from "react";

const ProjectHeader = () => {
  return (
    <div className="flex sm:flex-row flex-col sm:items-center items-start justify-between sm:gap-8 gap-1 px-6 py-2">
      <div>
        <h1 className="font-instrumentic text-2xl">Week 26</h1>
        <p className="text-xs">Jun 24 - 30</p>
      </div>
      <p className="text-xs sm:text-end text-start text-gray-600">
        Support the best projects with your feedback & upvotes. <br /> You can
        launch your project on Monday, next week.
      </p>
    </div>
  );
};

export default ProjectHeader;
