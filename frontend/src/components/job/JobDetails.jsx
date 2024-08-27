import React, { useState } from "react";
import Input from "../utils/ui/Input";
import Button from "../utils/ui/Button";
import "react-quill/dist/quill.snow.css";
import "../../hooks/work/useAddWork";
import TagInput from "../utils/ui/TagInput";
import ReactQuill from "react-quill";
import Select from "react-select";
import { joboptions } from "../../utils/data";
import { useAddJob } from "../../hooks/job/useAddJob";
import { toast } from "react-toastify";
const JobDetails = () => {
  const [data, setData] = useState({
    title: "",
    company: "",
    type: "",
    application_link: "",
    location: "",
    experience: "",
    skills: [],
    description: "",
  });
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  const addJob = useAddJob();
  const handleSave = () => {
    if (!data.company || !data.type || !data.title || !data.application_link) {
      return toast.error("All Fields required");
    }
    addJob.mutate(data);
  };
  return (
    <div className="mt-14 border-r h-full pb-14">
      <div className="py-8 px-8 flex flex-col gap-6">
        <div className="flex   md:flex-row flex-col gap-2 border-b pb-6 border-gray-300">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className="text-primary font-medium text-sm flex-1">Job Title</p>
          </div>
          <div className="w-full">
            <Input
              value={data.institute_name}
              onChange={(e) =>
                setData({
                  ...data,
                  title: e.target.value,
                })
              }
              placeholder="Devops Enginner"
            />
          </div>
        </div>
        <div className="flex  md:flex-row flex-col gap-2 border-b pb-6 border-gray-300">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Company Name
            </p>
          </div>
          <div className="w-full">
            <Input
              value={data.company}
              onChange={(e) =>
                setData({
                  ...data,
                  company: e.target.value,
                })
              }
              placeholder="PeerHub"
            />
          </div>
        </div>
        <div className="flex  md:flex-row flex-col gap-2 border-b pb-6 border-gray-300">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Application Link
            </p>
          </div>
          <div className="w-full">
            <Input
              value={data.application_link}
              onChange={(e) =>
                setData({
                  ...data,
                  application_link: e.target.value,
                })
              }
              placeholder="careers.peerhub.com"
            />
          </div>
        </div>
        <div className="flex  md:flex-row flex-col gap-2 border-b pb-6 border-gray-300">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Role Type
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
              onChange={(e) => {
                setData({ ...data, type: e.value });
              }}
              options={joboptions}
              className="text-sm py-0 hover:border-gray-600 "
            />
          </div>
        </div>
        <div className="flex  md:flex-row flex-col gap-2 border-b pb-6 border-gray-300">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">Location</p>
          </div>
          <div className="w-full">
            <Input
              value={data.location}
              onChange={(e) =>
                setData({
                  ...data,
                  location: e.target.value,
                })
              }
              placeholder="Ex: Remote(India)"
            />
          </div>
        </div>
        <div className="flex  md:flex-row flex-col gap-2 border-b pb-6 border-gray-300">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Experience
            </p>
          </div>
          <div className="w-full">
            <Input
              value={data.experience}
              onChange={(e) =>
                setData({
                  ...data,
                  experience: e.target.value,
                })
              }
              placeholder="Ex: 2 (in years)"
            />
          </div>
        </div>
        <div className="flex  md:flex-row flex-col gap-2 border-b pb-6 border-gray-300">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">Skills</p>
          </div>
          <div className="w-full">
            <TagInput
              label="Skills"
              skills={data.skills}
              onChange={(newSkills) =>
                setData((prevData) => ({
                  ...prevData,
                  skills: newSkills,
                }))
              }
            />
          </div>
        </div>
        <div className="flex  flex-col gap-2 pb-6 ">
          <div className="flex flex-col flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Description
            </p>
          </div>
          <div className="w-full">
            <span className="text-[10px] text-gray-600">
              Add every inofrmation about the role in detail that applicants may
              need
            </span>
            <ReactQuill
              onChange={(content) => {
                setData({ ...data, description: content });
              }}
              theme="snow"
              className="h-[250px] "
              modules={modules}
            />
          </div>
        </div>
      </div>
      <div className="fixed max-w-[640px] w-full md:bottom-0 bottom-16 flex items-center justify-end px-6 py-4 bg-[#f6f8fa] border-t border-r">
        <Button
          title="Save"
          onClick={handleSave}
          //   loading={addEducationMutation.isPending}
          className="bg-[#00aa45] text-xs text-white border-2 border-[#219653] rounded-full px-3 py-0.5 hover:bg-[#219653]"
        />
      </div>
    </div>
  );
};

export default JobDetails;
