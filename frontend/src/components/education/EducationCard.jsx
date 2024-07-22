import { Pencil } from "lucide-react";
import React from "react";

const EducationCard = ({ education, isOwnProfile }) => {
  return (
    <div className="flex flex-col group">
      <div className="flex justify-between items-center">
        <h1 className="text-sm capitalize font-semibold">
          {education?.institute_name}
        </h1>
        {isOwnProfile && (
          <div className="group-hover:block hidden">
            <Pencil
              size={16}
              className="text-gray-600 hover:text-black cursor-pointer"
            />
          </div>
        )}
      </div>
      <p className="text-xs">
        {education.degree}, {education.study}
      </p>
      <span className="text-xs text-gray-600">
        {education.start_year} - {education.end_year}
      </span>
    </div>
  );
};

export default EducationCard;
