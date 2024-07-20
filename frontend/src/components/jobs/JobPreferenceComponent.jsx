import React, { useState } from "react";
import ProfileSaparator from "../profile/ProfileSaparator";
import { CircleUser, Compass, NotebookText } from "lucide-react";
import Options from "../utils/ui/Options";
import { roles } from "../../utils/data";
import { joboptions } from "../../utils/data";
import Input from "../utils/ui/Input";
import Select from "../utils/ui/Select";
const JobPreferenceComponent = () => {
  const [selected, setSelected] = useState("actively-applying-1");

  const handleRadioChange = (id) => {
    setSelected(id);
  };

  return (
    <div className="mt-[52px] border-r">
      <div className="pt-8 px-4">
        <ProfileSaparator icon={Compass} title="OPEN FOR NEW JOB?" />
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center">
            <input
              type="radio"
              name="status"
              id="actively-applying-1"
              className="hidden"
              checked={selected === "actively-applying-1"}
              onChange={() => handleRadioChange("actively-applying-1")}
            />
            <label
              htmlFor="actively-applying-1"
              className="flex items-center cursor-pointer"
              onClick={() => handleRadioChange("actively-applying-1")}
            >
              <span
                className={
                  selected === "actively-applying-1"
                    ? "w-4 h-4 inline-block mr-2 border-2 border-green-500 rounded-full flex-no-shrink"
                    : "w-4 h-4 inline-block mr-2 border-2 border-gray-300 rounded-full flex-no-shrink"
                }
              >
                {selected === "actively-applying-1" && (
                  <span className="block w-2 h-2 m-0.5 rounded-full bg-green-500" />
                )}
              </span>
              <div className="flex flex-col">
                <span
                  className={
                    selected === "actively-applying-1"
                      ? "font-semibold text-sm"
                      : "text-sm"
                  }
                >
                  Yes — actively applying.
                </span>
                <span className="text-gray-600 text-xs">
                  Get recommended to recruiters hiring for relevant roles.
                </span>
              </div>
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="status"
              id="actively-applying-2"
              className="hidden"
              checked={selected === "actively-applying-2"}
              onChange={() => handleRadioChange("actively-applying-2")}
            />
            <label
              htmlFor="actively-applying-2"
              className="flex items-center cursor-pointer"
              onClick={() => handleRadioChange("actively-applying-2")}
            >
              <span
                className={
                  selected === "actively-applying-2"
                    ? "w-4 h-4 inline-block mr-2 border-2 border-green-500 rounded-full flex-no-shrink"
                    : "w-4 h-4 inline-block mr-2 border-2 border-gray-300 rounded-full flex-no-shrink"
                }
              >
                {selected === "actively-applying-2" && (
                  <span className="block w-2 h-2 m-0.5 rounded-full bg-green-500" />
                )}
              </span>
              <div className="flex flex-col">
                <span
                  className={
                    selected === "actively-applying-2"
                      ? "font-semibold text-sm"
                      : "text-sm"
                  }
                >
                  Yes — casually looking.
                </span>
                <span className="text-gray-600 text-xs">
                  Recruiters can discover you, and we'll selectively recommend
                  new jobs.
                </span>
              </div>
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="status"
              id="actively-applying-3"
              className="hidden"
              checked={selected === "actively-applying-3"}
              onChange={() => handleRadioChange("actively-applying-3")}
            />
            <label
              htmlFor="actively-applying-3"
              className="flex items-center cursor-pointer"
              onClick={() => handleRadioChange("actively-applying-3")}
            >
              <span
                className={
                  selected === "actively-applying-3"
                    ? "w-4 h-4 inline-block mr-2 border-2 border-green-500 rounded-full flex-no-shrink"
                    : "w-4 h-4 inline-block mr-2 border-2 border-gray-300 rounded-full flex-no-shrink"
                }
              >
                {selected === "actively-applying-3" && (
                  <span className="block w-2 h-2 m-0.5 rounded-full bg-green-500" />
                )}
              </span>
              <div className="flex flex-col">
                <span
                  className={
                    selected === "actively-applying-3"
                      ? "font-semibold text-sm"
                      : "text-sm"
                  }
                >
                  Not looking for new jobs
                </span>
                <span className="text-gray-600 text-xs">
                  Your profile won’t be recommended to recruiters.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="pt-16 px-4">
        <ProfileSaparator icon={NotebookText} title="JOB PREFERENCES" />
        <div className="flex flex-col gap-8">
          <div className="flex gap-2">
            <h1 className="font-medium w-[200px] text-sm">Preferred roles</h1>
            <div className="w-full flex-1">
              <div className="flex  justify-between text-xs">
                <p>Select role(s)</p>
                <p className="text-[10px]">Upto 5</p>
              </div>
              <Options options={roles} />
            </div>
          </div>
          <div className="flex gap-2">
            <h1 className="font-medium w-[200px] text-sm overflow-y-auto">
              Preferred job types
            </h1>
            <div className="w-full flex-1">
              <div className="flex justify-between text-xs">
                <p>Select job type(s)</p>
                <p className="text-[10px]">Upto 3</p>
              </div>
              <Options options={joboptions} />
            </div>
          </div>
          <div className="flex gap-2">
            <h1 className="font-medium w-[200px] text-sm overflow-y-auto">
              Current and expected annual salary
            </h1>
            <div>
              <div className="flex flex-1 gap-2">
                <div>
                  <span className="pb-0.5 text-xs">Current salary (CTC)</span>
                  <Input placeholder="Enter Start" />
                </div>
                <div>
                  <span className="pb-0.5 text-xs">Expected salary (CTC)</span>
                  <Input placeholder="Enter End" />
                </div>
              </div>
              <span className="text-[10px] text-gray-600">
                We understand this is private and confidential information.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 px-4">
        <ProfileSaparator title="IDENTITY" icon={CircleUser} />
        <div>
          <p className="text-xs mb-2">
            Self-identifying is optional, and we promise to handle your
            information with highest care.
          </p>
          <p className="text-xs mb-2">
            At Peerlist, we're committed to acting in favor of equal
            opportunity, regardless of ethnicity, age, gender, beliefs,
            religion, or sexual orientation. We want to help companies hire more
            inclusively. Part of that includes asking candidates to share
            demographic information so we can help recruiters to understand and
            build their hiring pipeline.
          </p>
          <div className="mt-4">
            <div className="flex gap-2">
              <h1 className="font-medium w-[200px] text-sm">Gender identity</h1>
              <div className="w-full flex-1">
                <div className="flex  justify-between text-xs">
                  <p>Select gender</p>
                </div>
                <Select />
              </div>
            </div>
            <div className="flex gap-2 mt-10">
              <h1 className="font-medium w-[200px] text-sm">Date of Birth</h1>
              <div className="w-full flex-1">
                <Input />
                <span className="text-gray-600 text-xs">
                  Don't worry, we won't send birthday notifications to your
                  network.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPreferenceComponent;
