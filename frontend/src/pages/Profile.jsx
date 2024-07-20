import React from "react";
import Sidebar from "../components/utils/Sidebar";
import { Edit, Plus } from "lucide-react";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import UserProfile from "../components/profile/UserProfile";
import { Link, useParams } from "react-router-dom";
import AddProject from "../components/profile/AddProject";
import GradientCard2 from "../components/utils/GradientCard2";
import useUserProfile from "../hooks/profile/useUserProfile";
import { useSelector } from "react-redux";
import { integrations } from "../utils/data";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Profile = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useUserProfile(id);
  const loggedInUser = useSelector((state) => state.user.user);
  const user = data?.data;
  console.log(user);

  const isOwnProfile = loggedInUser?.username === user?.username;
  if (isLoading) {
    return (
      <Sidebar>
        <div className="flex">
          <div className="sm:w-[640px] border-r w-full">
            <div className="mb-4">
              <Skeleton height={40} />
            </div>
            <div className="">
              {/* UserProfile skeleton */}
              <div className="mb-6">
                <Skeleton height={200} />
              </div>

              {/* Navigation links skeleton */}
              <div className="mx-6 flex items-center justify-center gap-10 border-b border-gray-300 pb-2.5">
                {[1, 2, 3, 4].map((item) => (
                  <Skeleton key={item} width={60} />
                ))}
              </div>

              {/* Showcase section skeleton */}
              <div className="pt-8 pb-10 w-full px-6">
                <Skeleton width={200} height={24} className="mb-4" />
                <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Skeleton key={item} height={40} />
                  ))}
                </div>
              </div>

              {/* AddProject skeleton */}
              <div className="px-6 mb-8">
                <Skeleton height={200} />
              </div>

              {/* Social links skeleton */}
              <div className="px-8 w-full">
                <div className="pt-14 border-t border-gray-300 flex items-center justify-center gap-3">
                  {[1, 2, 3, 4].map((item) => (
                    <Skeleton key={item} circle width={16} height={16} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar skeleton */}
          <div className="hidden sm:block w-[320px]">
            <div className="mt-8 px-8 flex flex-col gap-4">
              <Skeleton height={200} />
              <Skeleton height={200} />
            </div>
          </div>
        </div>
      </Sidebar>
    );
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
              <Link className="py-2.5 border-b-2 text-[#00aa45] border-[#00aa45]">
                WORK
              </Link>
              <Link className="py-2.5 hover:border-gray-600 hover:border-b-2">
                ABOUT
              </Link>
              <Link
                to={`/${user?.username}/resume`}
                className="py-2.5 hover:border-gray-600 hover:border-b-2"
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
            <div className="pt-8 pb-10 w-full px-6">
              <h1 className="font-medium mb-4">Showcase your work from:</h1>
              <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                {integrations?.map((integration) => (
                  <div
                    key={integration.id}
                    className="group hover:cursor-pointer hover:bg-white hover:shadow-md duration-400 ease-linear flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-[#f6f8fa]"
                  >
                    <div className="flex items-center gap-2 ">
                      <img
                        height={16}
                        width={16}
                        src={integration.image}
                        alt=""
                      />
                      <span className="text-sm">{integration.title}</span>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center group-hover:bg-green-600 rounded-full">
                      <Plus
                        className="group-hover:text-white group-hover:-rotate-90 focus-visible:-rotate-90 transition duration-400 ease-linear"
                        size={16}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <AddProject projects={user?.projects} isOwnProfile={isOwnProfile} />
            <div className="px-8 w-full ">
              <div className="pt-14 border-t border-gray-300 flex items-center justify-center gap-3">
                {/* <a href="">
                  <img height={16} width={16} src={Instagram} alt="" />
                </a>
                <a href="">
                  <img height={16} width={16} src={Linkedin} alt="" />
                </a>
                <a href="">
                  <img height={16} width={16} src={Twitter} alt="" />
                </a>
                <a href="">
                  <img height={16} width={16} src={Leetcode} alt="" />
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <Rightsidebar>
          <div className="mt-8 flex flex-col gap-4">
            <GradientCard />
            <GradientCard2 />
          </div>
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default Profile;
