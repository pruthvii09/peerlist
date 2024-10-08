import React, { useState } from "react";
import Input from "../utils/ui/Input";
import Button from "../utils/ui/Button";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { degrees, years } from "../../utils/data";
import "../../hooks/work/useAddWork";
import { useAddEducation } from "../../hooks/education/useAddEducation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useModal } from "../../context/ModalContext";
const EducationDetails = () => {
  const [educationDetails, setEducationDetails] = useState({
    institute_name: "",
    degree: "",
    study: "",
    start_year: "",
    end_year: "",
  });
  const { showModal } = useModal();
  const { user } = useSelector((store) => store.user);

  const addEducationMutation = useAddEducation();

  const handleSave = () => {
    if (!user) {
      return showModal("loginmodal");
    } else {
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
    }
  };
  return (
    <div className="mt-14 border-r h-full pb-14">
      <div className="py-8 px-8 flex flex-col gap-6">
        <div className="flex   md:flex-row flex-col gap-2 border-b pb-6 border-gray-300">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className="text-primary font-medium text-sm flex-1">
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
        <div className="flex  md:flex-row flex-col gap-2 border-b pb-6 border-gray-300">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Degree type
            </p>
          </div>
          <div className="w-full">
            <Select
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  boxShadow: state.isFocused ? "none" : provided.boxShadow,
                  borderColor: state.isFocused ? "none" : provided.borderColor,
                  "&:hover": {
                    borderColor: state.isFocused
                      ? "none"
                      : provided.borderColor,
                  },
                }),
              }}
              onChange={(selectedOption) => {
                setEducationDetails({
                  ...educationDetails,
                  degree: selectedOption.value,
                });
              }}
              options={degrees}
              className="text-sm py-0 hover:border-gray-600 "
            />
          </div>
        </div>
        <div className="flex  md:flex-row flex-col gap-2 border-b pb-6 border-gray-300">
          <div className="flex md:w-[200px] flex-shrink-0">
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
        <div className="flex  md:flex-row flex-col gap-2 border-b pb-6 border-gray-300">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Start / End date
            </p>
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="flex-1">
              <span className="text-xs">From (Year)</span>
              <Select
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: state.isFocused ? "none" : provided.boxShadow,
                    borderColor: state.isFocused
                      ? "none"
                      : provided.borderColor,
                    "&:hover": {
                      borderColor: state.isFocused
                        ? "none"
                        : provided.borderColor,
                    },
                  }),
                }}
                options={years}
                className="text-sm py-0 hover:border-gray-600 "
                onChange={(selectedOption) =>
                  setEducationDetails({
                    ...educationDetails,
                    start_year: String(selectedOption.value),
                  })
                }
              />
            </div>
            <div className="flex-1">
              <span className="text-xs">To (Year)</span>
              <Select
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    boxShadow: state.isFocused ? "none" : provided.boxShadow,
                    borderColor: state.isFocused
                      ? "none"
                      : provided.borderColor,
                    "&:hover": {
                      borderColor: state.isFocused
                        ? "none"
                        : provided.borderColor,
                    },
                  }),
                }}
                options={years}
                className="text-sm py-0 hover:border-gray-600 "
                onChange={(selectedOption) =>
                  setEducationDetails({
                    ...educationDetails,
                    end_year: String(selectedOption.value),
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed max-w-[640px] w-full md:bottom-0 bottom-16 flex items-center justify-end px-6 py-4 bg-[#f6f8fa] border-t border-r">
        <Button
          title="Save"
          onClick={handleSave}
          loading={addEducationMutation.isPending}
          className="bg-[#00aa45] text-xs text-white border-2 border-[#219653] rounded-full px-3 py-0.5 hover:bg-[#219653]"
        />
      </div>
    </div>
  );
};

export default EducationDetails;
