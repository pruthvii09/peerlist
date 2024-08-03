import React, { useMemo, useState } from "react";
import Sidebar from "../components/utils/Sidebar";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import { Bell, Filter, X } from "lucide-react";
import ProfileCard from "../components/search/ProfileCard";
import useGetAllProfile from "../hooks/profile/usetGetAllProfile";
import ProfileCardSkeleton from "../components/skeleton/ProfileCardSkeleton";
import { useSelector } from "react-redux";
import SearchFilter from "../components/search/SearchFilter";
const Search = () => {
  const { data, isLoading } = useGetAllProfile();
  const allUsers = data?.data;
  const { user } = useSelector((store) => store.user);
  const [showSheet, setShowSheet] = useState(false);
  const [searchFilter, setSearchFilter] = useState({
    city: "",
    country: "",
    skills: [],
  });
  // const [filteredUsers, setFilteredUsers] = useState([]);
  const filteredUsers = useMemo(() => {
    if (!allUsers) return [];
    return allUsers.filter((user) => {
      const cityMatch =
        !searchFilter.city ||
        user?.city?.toLowerCase() === searchFilter?.city?.toLowerCase();
      const countryMatch =
        !searchFilter?.country ||
        user?.country?.toLowerCase() === searchFilter?.country?.toLowerCase();
      const skillsMatch =
        searchFilter.skills.length === 0 ||
        searchFilter.skills.some(
          (skill) =>
            user.skills &&
            user.skills
              .map((s) => s?.name?.toLowerCase())
              .includes(skill?.name?.toLowerCase())
        );

      return cityMatch && countryMatch && skillsMatch;
    });
  }, [allUsers, searchFilter]);
  const displayedUsers =
    searchFilter.city || searchFilter.country || searchFilter.skills.length > 0
      ? filteredUsers
      : allUsers;
  return (
    <Sidebar>
      <div className="flex">
        <div className="md:w-[640px] w-full ">
          <ComponentHeader
            title="Search"
            children={
              <div className="block md:hidden">
                {showSheet ? (
                  <div
                    onClick={() => setShowSheet(!showSheet)}
                    className="px-2 cursor-pointer py-2 border border-gray-300 rounded-full flex items-center gap-1 h-[36px]"
                  >
                    <X size={18} />
                  </div>
                ) : (
                  <div
                    onClick={() => setShowSheet(!showSheet)}
                    className="px-2 cursor-pointer py-2 border border-gray-300 rounded-full flex items-center gap-1 h-[36px]"
                  >
                    <Filter size={18} />
                  </div>
                )}
              </div>
            }
          />
          <div className="mt-14  p-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-r border-gray-300 pb-24 min-h-screen max-h-full">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="h-fit">
                  <ProfileCardSkeleton />
                </div>
              ))
            ) : (
              <>
                {displayedUsers.length <= 0 ? (
                  <div className="text-red-500 text-sm">No users found</div>
                ) : (
                  displayedUsers?.map((singleUser) => {
                    const isFollowing = singleUser?.followers?.some(
                      (x) => x.followeeId === user?.id
                    );
                    return (
                      <div key={singleUser.id} className="h-fit">
                        <ProfileCard
                          follow={isFollowing}
                          user={singleUser}
                          isLoading={isLoading}
                        />
                      </div>
                    );
                  })
                )}
              </>
            )}
          </div>
        </div>
        <Rightsidebar>
          <SearchFilter
            searchFilter={searchFilter}
            setSearchFilter={setSearchFilter}
          />
        </Rightsidebar>
      </div>
      {showSheet && (
        <SearchFilter
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          setShowSheet={setShowSheet}
        />
      )}
    </Sidebar>
  );
};

export default Search;
