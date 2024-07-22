import React, { useState } from "react";
import Sidebar from "../components/utils/Sidebar";
import { BriefcaseBusiness, ChevronDown, Edit, Plus } from "lucide-react";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import UserProfile from "../components/profile/UserProfile";
import { Link, useNavigate, useParams } from "react-router-dom";
import GradientCard2 from "../components/utils/GradientCard2";
import useUserProfile from "../hooks/profile/useUserProfile";
import { useSelector } from "react-redux";
import WorkCard from "../components/work/WorkCard";
import useFetchWork from "../hooks/work/useGetWork";
import ProfileSkeleton from "../components/utils/ProfileSkeleton";
import EducationCard from "../components/education/EducationCard";
import useFetchEducation from "../hooks/education/useGetEducation";
import HighlightCard from "../components/profile/HighlightCard";

const UserResume = () => {
  const { id } = useParams();
  const [showOptions, setShowOptions] = useState(false);
  const { data, isLoading } = useUserProfile(id);
  const loggedInUser = useSelector((state) => state.user.user);
  const user = data?.data;
  const isOwnProfile = loggedInUser?.username === user?.username;
  const { data: workExp } = useFetchWork(id);
  const { data: eduExp, isLoading: eduLoading } = useFetchEducation(id);
  const navigate = useNavigate();
  const works = workExp?.data;
  const educations = eduExp?.data;
  console.log("edu", educations);
  if (isLoading || eduLoading) {
    return <ProfileSkeleton />;
  }
  return (
    <Sidebar>
      <div className="flex">
        <div className="sm:w-[640px] w-full">
          {isOwnProfile ? (
            <ComponentHeader
              title={`${user?.firstname} ${user?.lastname}`}
              iconConfig={{ icon: Edit }}
              href={`/${user?.username}/edit`}
            />
          ) : (
            <ComponentHeader
              title={`${user?.firstname} ${user?.lastname}`}
              follow={true}
            />
          )}
          <div className="border-r border-gray-300">
            <UserProfile />
            <div className="mx-6 flex items-center justify-center gap-10 border-b border-gray-300 text-xs font-semibold">
              <Link
                to={`/user/${user?.username}`}
                className="py-2.5 hover:border-gray-600 hover:border-b-2"
              >
                WORK
              </Link>
              <Link className="py-2.5 hover:border-gray-600 hover:border-b-2">
                ABOUT
              </Link>
              <Link
                to={`/${user?.username}/resume`}
                className="py-2.5 text-[#00aa45] border-b-2  border-[#00aa45]  hover:border-b-2"
              >
                RESUME
              </Link>
              <Link
                to={`/${user?.username}/posts`}
                className="py-2.5 hover:border-gray-600 hover:border-b-2"
              >
                POSTS •&nbsp; {user?._count.posts}
              </Link>
            </div>
            <div className="pt-8 pb-10 w-full px-8">
              {isOwnProfile && (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="relative flex items-center gap-1 bg-black text-white border px-2 rounded-full py-1"
                  >
                    <span className="text-xs">Add New</span>
                    <ChevronDown size={16} />
                    {showOptions && (
                      <div className="absolute bg-white z-10 shadow-2xl rounded top-8 text-black border border-gray-300 flex flex-col items-start justify-start px-2 py-2">
                        <Link
                          to={`/${user?.username}/resume/add-education`} // Updated route
                          className="flex py-2 hover:bg-gray-100 px-4 items-center gap-2"
                        >
                          <div className="p-0.5 border border-gray-300 rounded-full">
                            <Plus size={10} />
                          </div>
                          <span className="text-xs font-medium">Education</span>
                        </Link>
                        <Link
                          to={`/${user?.username}/resume/add-experience`} // Added Link wrapper
                          className="flex py-2 hover:bg-gray-100 px-4 items-center gap-2"
                        >
                          <div className="p-0.5 border border-gray-300 rounded-full">
                            <Plus size={10} />
                          </div>
                          <span className="text-xs font-medium">
                            Experience
                          </span>
                        </Link>
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => navigate(`/${user.username}/job-preference`)}
                    className="flex items-center gap-1 border px-2 rounded-full py-1"
                  >
                    <BriefcaseBusiness size={16} />
                    <span className="text-xs">Job Preferences</span>
                  </button>
                </div>
              )}
              <div className="mt-8 ">
                <div>
                  <h1 className="font-base font-semibold">Experience</h1>
                  <div className="mt-4 flex flex-col gap-2">
                    {works?.map((work) => (
                      <WorkCard
                        work={work}
                        key={work.id}
                        isOwnProfile={isOwnProfile}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <h1 className="font-base font-semibold">Education</h1>
                  <div className="mt-4 flex flex-col gap-2">
                    {educations.map((education, i) => (
                      <EducationCard
                        education={education}
                        key={i}
                        isOwnProfile={isOwnProfile}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Rightsidebar>
          <div className="mt-8 flex flex-col gap-4">
            <HighlightCard user={user} />
          </div>
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default UserResume;
