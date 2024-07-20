import React, { useState } from "react";
import Input from "../utils/ui/Input";
import Button from "../utils/ui/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "../utils/ui/Select";
import { months, years } from "../../utils/data";
import TagInput from "../utils/ui/TagInput";
import "../../hooks/work/useAddWork";
import { useAddWork } from "../../hooks/work/useAddWork";
const WorkDetails = () => {
  const [workData, setWorkData] = useState({
    title: "",
    company_name: "",
    start_date: "",
    end_date: "",
    skills: [],
    description: "",
  });

  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [selectedStartMonth, setSelectedStartMonth] = useState("");
  const [selectedStartYear, setSelectedStartYear] = useState("");
  const [selectedEndMonth, setSelectedEndMonth] = useState("");
  const [selectedEndYear, setSelectedEndYear] = useState("");

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"], // toggled buttons
      ["link"], // link
      [{ list: "ordered" }, { list: "bullet" }], // lists
    ],
  };

  const handleStartMonthChange = (e) => {
    setSelectedStartMonth(e.target.value);
    if (selectedStartYear) {
      setWorkData({
        ...workData,
        start_date: `${e.target.value} ${selectedStartYear}`,
      });
    }
  };

  const handleStartYearChange = (e) => {
    setSelectedStartYear(e.target.value);
    if (selectedStartMonth) {
      setWorkData({
        ...workData,
        start_date: `${selectedStartMonth} ${e.target.value}`,
      });
    }
  };

  const handleEndMonthChange = (e) => {
    setSelectedEndMonth(e.target.value);
    if (selectedEndYear) {
      setWorkData({
        ...workData,
        end_date: `${e.target.value} ${selectedEndYear}`,
      });
    }
  };

  const handleEndYearChange = (e) => {
    setSelectedEndYear(e.target.value);
    if (selectedEndMonth) {
      setWorkData({
        ...workData,
        end_date: `${selectedEndMonth} ${e.target.value}`,
      });
    }
  };

  const handleCheckboxChange = () => {
    setCurrentlyWorking(!currentlyWorking);
    if (!currentlyWorking) {
      setWorkData({ ...workData, end_date: "Present" });
    } else {
      setWorkData({ ...workData, end_date: "" });
    }
  };
  const addWorkMutation = useAddWork();
  const handleSave = () => {
    addWorkMutation.mutate(workData);
  };

  return (
    <div className="mt-14 border-r h-full pb-14">
      <div className="py-8 px-8 flex flex-col gap-6">
        <div className="flex gap-2 border-b pb-6 border-gray-300">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Job title
            </p>
          </div>
          <div className="w-full">
            <Input
              value={workData.title}
              onChange={(e) =>
                setWorkData({ ...workData, title: e.target.value })
              }
              placeholder="Product Designer"
            />
          </div>
        </div>
        <div className="flex gap-2 border-b pb-6 border-gray-300">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Company Name
            </p>
          </div>
          <div className="w-full">
            <Input
              value={workData.company_name}
              onChange={(e) =>
                setWorkData({ ...workData, company_name: e.target.value })
              }
              placeholder="Peerlist"
            />
          </div>
        </div>
        <div className="flex gap-2 border-b pb-6 border-gray-300">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Start Date
            </p>
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="flex-1">
              <span className="text-xs">From Month</span>
              <Select
                options={months}
                value={selectedStartMonth}
                onChange={handleStartMonthChange}
              />
            </div>
            <div className="flex-1">
              <span className="text-xs">From Year</span>
              <Select
                options={years}
                value={selectedStartYear}
                onChange={handleStartYearChange}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 border-b pb-6 border-gray-300">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">End Date</p>
          </div>
          <div className="w-full gap-2 items-center">
            <div className="flex-1 flex gap-2">
              <div className="flex-1">
                <span className="text-xs">To Month</span>
                <Select
                  options={months}
                  value={selectedEndMonth}
                  onChange={handleEndMonthChange}
                  isDisabled={currentlyWorking}
                />
              </div>
              <div className="flex-1">
                <span className="text-xs">To Year</span>
                <Select
                  options={years}
                  value={selectedEndYear}
                  onChange={handleEndYearChange}
                  isDisabled={currentlyWorking}
                />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <input
                type="checkbox"
                id="currentlyWorking"
                checked={currentlyWorking}
                onChange={handleCheckboxChange}
              />
              <label className="text-xs" htmlFor="currentlyWorking">
                I Currently work here
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-2 border-b pb-6 border-gray-300">
          <div className="flex flex-col sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Skills, tools, roles, etc.
            </p>
            <p className="text-[10px] text-gray-500">
              Mention the skills you utilized and acquired, tools you used and
              learned.
            </p>
          </div>
          <div className="w-full">
            <TagInput
              skills={workData.skills}
              onChange={(skills) => setWorkData({ ...workData, skills })}
            />
          </div>
        </div>
        <div className="mt-8">
          <div>
            <p className=" text-primary font-medium text-sm flex-1 mb-1">
              About your role
            </p>
          </div>
          <ReactQuill
            value={workData.description}
            onChange={(description) =>
              setWorkData({ ...workData, description })
            }
            placeholder="Tell us about your responsibilities, learnings, etc"
            theme="snow"
            className="h-[200px]"
            modules={modules}
          />
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

export default WorkDetails;
