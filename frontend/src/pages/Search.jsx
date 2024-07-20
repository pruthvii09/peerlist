import React from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import { ChevronDown } from "lucide-react";
import ProfileCard from "../components/search/ProfileCard";
import useGetAllProfile from "../hooks/profile/usetGetAllProfile";
import Select from "../components/utils/ui/Select";
import Input from "../components/utils/ui/Input";
import Button from "../components/utils/ui/Button";
const Search = () => {
  const { data, isLoading } = useGetAllProfile();
  const allUsers = data?.data;
  // const loggedInUserId = useSelector((store) => store.user.user);

  // // Filter out the logged-in user
  // const filteredUsers = allUsers?.filter(
  //   (user) => user.id !== loggedInUserId.id
  // );
  return (
    <Sidebar>
      <div className="flex">
        <div className="sm:w-[640px] w-full h-screen">
          <ComponentHeader title="Search" iconConfig={{ icon: ChevronDown }} />
          <div className="mt-14 h-fit p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-r border-gray-300">
            {allUsers?.map((user) => (
              <div className="h-fit">
                <ProfileCard user={user} isLoading={isLoading} />
              </div>
            ))}
          </div>
        </div>
        <Rightsidebar>
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col">
              <div className="flex flex-col gap-6">
                <h1 className="text-sm font-semibold">Filter By</h1>
                <div className="grid grid-cols-2 gap-4">
                  <Select label="Country" />
                  <Select label="City" />
                </div>
                <div>
                  <Input label="Roles" />
                </div>
              </div>
            </div>
            <Button
              title="Apply"
              className="text-white font-medium w-fit bg-black rounded-full text-xs px-3 py-1"
            />
          </div>
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default Search;
