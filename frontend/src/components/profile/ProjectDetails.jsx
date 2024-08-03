import React, { useState } from "react";
import Input from "../utils/ui/Input";
import Button from "../utils/ui/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TagInput from "../utils/ui/TagInput";
import { useAddProjectMutation } from "../../hooks/projects/useAddProjectMutation";
import useDebounce from "../../hooks/useDebounce";
import useSearchProfile from "../../hooks/profile/useSearchProfile";
import { Loader2, X } from "lucide-react";

const ProjectDetails = ({ projectData, setProjectData }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  const handleEditorChange = (content) => {
    setProjectData({ ...projectData, description: content });
  };
  const addProjectMutation = useAddProjectMutation();
  const handleProject = () => {
    addProjectMutation.mutate(projectData);
  };
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading: searchLoad } = useSearchProfile(debouncedQuery);
  const handleUserSelect = (user) => {
    setProjectData((prevData) => ({
      ...prevData,
      collaborators: [...prevData.collaborators, user],
    }));
    setQuery("");
  };
  const handleRemoveUser = (userToRemove) => {
    setProjectData((prevData) => ({
      ...prevData,
      collaborators: prevData.collaborators.filter(
        (user) => user !== userToRemove
      ),
    }));
  };
  return (
    <div className="mt-14 border-r h-full pb-14">
      <div className="py-8 md:px-8 px-4 pb-24 ms flex flex-col gap-6">
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Project name
            </p>
          </div>
          <div className="w-full">
            <Input
              value={projectData.title}
              onChange={(e) =>
                setProjectData({ ...projectData, title: e.target.value })
              }
              placeholder="Peerlist"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">Tagline</p>
          </div>
          <div className="w-full">
            <Input
              value={projectData.tagline}
              onChange={(e) =>
                setProjectData({ ...projectData, tagline: e.target.value })
              }
              placeholder="A Professional network for people in tech"
            />
            <p className="text-[#6a737d] font-normal text-[10px] pt-0.5">
              Describe your project in 60 characters or less.
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Project URL
            </p>
          </div>
          <div className="w-full">
            <Input
              value={projectData.projectLink}
              onChange={(e) =>
                setProjectData({ ...projectData, projectLink: e.target.value })
              }
              placeholder="projectdemo.com/"
            />
            <p className="text-[#6a737d] font-normal text-[10px] pt-0.5">
              Provide a demo link where users can interact with your project or
              a download link. If unavailable, include codebase links.
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Collabrators
            </p>
          </div>
          <div className="w-full">
            {projectData?.collaborators.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                {projectData?.collaborators?.map((user) => (
                  <div className="flex items-center gap-1 border border-gray-300 px-3 py-0.5 rounded-full">
                    <img
                      className="w-4 h-4 rounded-full object-cover"
                      src={user.profileImageUrl}
                      alt=""
                    />
                    <span className="text-sm ">{user.firstname}</span>
                    <X
                      className="cursor-pointer"
                      size={12}
                      onClick={() => handleRemoveUser(user)}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="relative">
              <Input
                // placeholder="Start Typing.."
                value={query}
                readOnly={projectData.collaborators.length >= 3}
                onChange={(e) => setQuery(e.target.value)}
              />
              <p className="text-[#6a737d] font-normal text-[10px] pt-0.5">
                Add people who collaborated with you on this project.
              </p>
              {searchLoad ? (
                <div className="w-[350px] absolute top-[40px] md:right-4 right-0 bg-white rounded border border-gray-300 z-10">
                  <div className="py-4 flex items-center justify-center">
                    <Loader2 className="animate-spin text-green-600" />
                  </div>
                </div>
              ) : (
                <>
                  {data?.length <= 0 ? (
                    <div className="w-[350px] absolute top-[40px] md:right-4 right-0 bg-white rounded border border-gray-300 z-10">
                      <div className="py-4 text-red-500 text-sm px-4">
                        No user found
                      </div>
                    </div>
                  ) : (
                    <>
                      {data?.map((user, i) => (
                        <div
                          key={i}
                          className="w-[350px] z-10 absolute  top-[40px] md:right-4 right-0 bg-white rounded border border-gray-300"
                        >
                          <div
                            className="px-4 py-2 flex items-start gap-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleUserSelect(user)}
                          >
                            <div className="">
                              <img
                                src={user?.profileImageUrl}
                                className="w-8 h-8 rounded-full object-cover"
                                alt=""
                              />
                            </div>
                            <div>
                              <h1 className="text-sm font-semibold">
                                {user.firstname} {user.lastname}
                              </h1>
                              <p className="text-xs text-gray-600 paragraph-clamp">
                                {user.bio}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">Skills</p>
          </div>
          <div className="w-full">
            <TagInput
              skills={projectData.skills}
              onChange={(newSkills) =>
                setProjectData((prevData) => ({
                  ...prevData,
                  skills: newSkills,
                }))
              }
            />
            <p className="text-[#6a737d] font-normal text-[10px] pt-0.5">
              Add minimum 3 skills
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-col md:flex-row">
          <div className="flex md:w-[200px] flex-shrink-0">
            <p className=" text-primary font-medium text-sm flex-1">
              Is this project open source?
            </p>
          </div>
          <div className="w-full flex items-center">
            <input
              value={projectData.opensource}
              onChange={(e) =>
                setProjectData({ ...projectData, opensource: e.target.checked })
              }
              type="checkbox"
              name=""
              id=""
            />
            <span className="text-xs select-none cursor-pointer font-normal text-primary placeholder-gray-gray4 pl-2">
              Yes
            </span>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <p className=" text-primary font-medium text-sm flex-1">
              Describe the Project
            </p>
            <p className="text-xs mt-1 mb-3">
              Highly recommended! This helps a lot for SEO and find your project
              on Google.
            </p>
          </div>
          <ReactQuill
            value={projectData.description}
            onChange={handleEditorChange}
            theme="snow"
            className="h-[300px] "
            modules={modules}
          />
        </div>
      </div>
      <div className="fixed max-w-[640px] w-full md:bottom-0 bottom-16  px-6 py-4 bg-[#f6f8fa] border-t border-r">
        {addProjectMutation.error?.response.data.error && (
          <p className="text-red-500 text-xs">
            {addProjectMutation.error?.response.data.error}
          </p>
        )}
        <div className="flex items-center justify-end">
          <Button
            title="Save"
            loading={addProjectMutation.isPending}
            onClick={handleProject}
            className="bg-[#00aa45] text-xs text-white border-2 border-[#219653] rounded-full px-3 py-0.5 hover:bg-[#219653]"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
