import React, { useState } from "react";
import Input from "../utils/ui/Input";
import Button from "../utils/ui/Button";
import "react-quill/dist/quill.snow.css";
import Select from "../utils/ui/Select";
import { degrees, years } from "../../utils/data";
import "../../hooks/work/useAddWork";
import { useAddEducation } from "../../hooks/education/useAddEducation";
import { toast } from "react-toastify";
const EducationDetails = () => {
  const [educationDetails, setEducationDetails] = useState({
    institute_name: "",
    degree: "",
    study: "",
    start_year: "",
    end_year: "",
  });
  const addEducationMutation = useAddEducation();
  const handleSave = () => {
    console.log(educationDetails);
    if (
      !educationDetails.institute_name ||
      !educationDetails.degree ||
      !educationDetails.study ||
      !educationDetails.start_year ||
      !educationDetails.end_year
    ) {
      return toast.error("All Fields are Required!!");
    }
    addEducationMutation.mutate(educationDetails);
  };
  return (
    <div className="mt-14 border-r h-full pb-14">
      <div className="py-8 px-8 flex flex-col gap-6">
        <div className="flex gap-2 border-b pb-6 border-gray-300">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              School / College name
            </p>
          </div>
          <div className="w-full">
            <Input
              value={educationDetails.institute_name}
              onChange={(e) =>
                setEducationDetails({
                  ...educationDetails,
                  institute_name: e.target.value,
                })
              }
              placeholder="Pune University"
            />
          </div>
        </div>
        <div className="flex gap-2 border-b pb-6 border-gray-300">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Degree type
            </p>
          </div>
          <div className="w-full">
            <Select
              options={degrees}
              value={educationDetails.degree}
              onChange={(e) =>
                setEducationDetails({
                  ...educationDetails,
                  degree: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex gap-2 border-b pb-6 border-gray-300">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Major / Field of study
            </p>
          </div>
          <div className="w-full">
            <Input
              value={educationDetails.study}
              onChange={(e) =>
                setEducationDetails({
                  ...educationDetails,
                  study: e.target.value,
                })
              }
              placeholder="Ex: Computer Engineering"
            />
          </div>
        </div>
        <div className="flex gap-2 border-b pb-6 border-gray-300">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Start / End date
            </p>
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="flex-1">
              <span className="text-xs">From (Year)</span>
              <Select
                options={years}
                value={educationDetails.start_year}
                onChange={(e) =>
                  setEducationDetails({
                    ...educationDetails,
                    start_year: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex-1">
              <span className="text-xs">To (Year)</span>
              <Select
                options={years}
                value={educationDetails.end_year}
                onChange={(e) =>
                  setEducationDetails({
                    ...educationDetails,
                    end_year: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed max-w-[640px] w-full sm:bottom-0 bottom-16 flex items-center justify-end px-6 py-4 bg-[#f6f8fa] border-t border-r">
        <Button
          title="Save"
          onClick={handleSave}
          className="bg-[#00aa45] text-xs text-white border-2 border-[#219653] rounded-full px-3 py-0.5 hover:bg-[#219653]"
        />
      </div>
    </div>
  );
};

export default EducationDetails;
