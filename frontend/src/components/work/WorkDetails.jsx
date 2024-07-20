import React, { useState } from "react";
import Input from "../utils/ui/Input";
import Button from "../utils/ui/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "../utils/ui/Select";
import { months, years } from "../../utils/data";
import TagInput from "../utils/ui/TagInput";
const WorkDetails = () => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"], // toggled buttons
      ["link"], // link
      [{ list: "ordered" }, { list: "bullet" }], // lists
    ],
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
              //   value={projectData.title}
              //   onChange={(e) =>
              //     setProjectData({ ...projectData, title: e.target.value })
              //   }
              placeholder="Product Designer"
            />
          </div>
        </div>
        <div className="flex gap-2  border-b pb-6 border-gray-300">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Company Name
            </p>
          </div>
          <div className="w-full">
            <Input
              //   value={projectData.tagline}
              //   onChange={(e) =>
              //     setProjectData({ ...projectData, tagline: e.target.value })
              //   }
              placeholder="Peerlist"
            />
          </div>
        </div>
        <div className="flex gap-2  border-b pb-6 border-gray-300">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Start Date
            </p>
          </div>
          <div className="w-full flex gap-2 items-center">
            <div className="flex-1">
              <span className="text-xs">From Month</span>
              <Select options={months} />
            </div>
            <div className="flex-1">
              <span className="text-xs">From Year</span>
              <Select options={years} />
            </div>
          </div>
        </div>
        <div className="flex gap-2  border-b pb-6 border-gray-300">
          <div className="flex sm:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">End Date</p>
          </div>
          <div className="w-full  gap-2 items-center">
            <div className="flex-1 flex gap-2">
              <div className="flex-1">
                <span className="text-xs">To Month</span>
                <Select options={months} />
              </div>
              <div className="flex-1">
                <span className="text-xs">To Year</span>
                <Select options={years} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <input type="checkbox" name="" id="" />
              <label className="text-xs" htmlFor="">
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
              Mentions the skills you utilized and acquired, tools you used and
              learned.
            </p>
          </div>
          <div className="w-full">
            <TagInput skills={[]} />
          </div>
        </div>

        <div className="mt-8">
          <div>
            <p className=" text-primary font-medium text-sm flex-1 mb-1">
              About your role
            </p>
          </div>
          <ReactQuill
            // value={projectData.description}
            // onChange={handleEditorChange}
            placeholder="Tell us about your responsiblities, learnings, etc"
            theme="snow"
            className="h-[200px] "
            modules={modules}
          />
        </div>
      </div>
      <div className="fixed max-w-[640px] w-full sm:bottom-0 bottom-16 flex items-center justify-end px-6 py-4 bg-[#f6f8fa] border-t border-r">
        <Button
          title="Save"
          //   loading={addProjectMutation.isPending}
          //   onClick={handleProject}
          className="bg-[#00aa45] text-xs text-white border-2 border-[#219653] rounded-full px-3 py-0.5 hover:bg-[#219653]"
        />
      </div>
    </div>
  );
};

export default WorkDetails;
