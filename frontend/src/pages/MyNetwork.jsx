import React, { useState } from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import GradientCard from "../components/utils/GradientCard";
import GradientCard2 from "../components/utils/GradientCard2";
import useGetFollowerFollowing from "../hooks/profile/useGetAllFollowerFollowing";
import { useSelector } from "react-redux";
import ProfileCard from "../components/search/ProfileCard";
import { Loader2 } from "lucide-react";

const MyNetwork = () => {
  const { user } = useSelector((store) => store.user);
  const { data: followData, isLoading } = useGetFollowerFollowing(
    user?.username
  );
  const data = followData?.data;
  const [toggle, setToggle] = useState(true);
  return (
    <Sidebar>
      <div className="flex">
        <div className="sm:w-[640px] w-full">
          <ComponentHeader title="My Network" />
          <div className="mt-14 flex flex-col border-r border-gray-300">
            <div className="flex items-center px-6 border-b border-gray-300">
              <div
                onClick={() => setToggle(true)}
                className={`px-8 py-2.5 font-medium text-sm  cursor-pointer ${
                  toggle ? "border-b-2 border-black" : ""
                }`}
              >
                Following •&nbsp; {data?.followersCount}
              </div>
              <div
                onClick={() => setToggle(false)}
                className={`px-8 py-2.5 font-medium text-sm  cursor-pointer ${
                  !toggle ? "border-b-2 border-black" : ""
                }`}
              >
                Followers •&nbsp; {data?.followingCount}
              </div>
            </div>
            {isLoading ? (
              <div>
                <Loader2 className="animate-spin text-green-500" />
              </div>
            ) : (
              <>
                {toggle ? (
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data?.followers?.map((follow) => (
                      <ProfileCard
                        follow={true}
                        key={follow?.follower?.id}
                        user={follow?.follower}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data?.following?.map((follow) => (
                      <ProfileCard
                        follow={true}
                        key={follow?.followee?.id}
                        user={follow?.followee}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
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

export default MyNetwork;
