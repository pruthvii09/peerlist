import React from "react";
import Sidebar from "../components/utils/Sidebar";
import { Edit, Plus } from "lucide-react";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import UserProfile from "../components/profile/UserProfile";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddProject from "../components/profile/AddProject";
import useUserProfile from "../hooks/profile/useUserProfile";
import { useSelector } from "react-redux";
import { integrations } from "../utils/data";
import ProfileSkeleton from "../components/utils/ProfileSkeleton";
import HighlightCard from "../components/profile/HighlightCard";
import { useModal } from "../context/ModalContext";
import GithubDetails from "../components/profile/GithubDetails";
const Profile = () => {
  const { id } = useParams();
  console.log(id);
  const { data, isLoading, isError } = useUserProfile(id);
  console.log(data);
  const loggedInUser = useSelector((state) => state.user.user);
  const user = data?.data;
  const navigate = useNavigate();
  const { showModal } = useModal();
  const isOwnProfile = loggedInUser?.username === user?.username;
  const isAlreadyFollowing = user?.followers?.some(
    (follower) => follower.followeeId === loggedInUser?.id
  );
  function loginGithub() {
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=Iv23lidnCU7MshKkW99u`
    );
  }
  if (isLoading) {
    return <ProfileSkeleton />;
  }
  if (isError) {
    return navigate("/not-found");
  }

  return (
    <Sidebar>
      <div className="flex">
        <div className="md:w-[640px] w-full">
          {isOwnProfile ? (
            <ComponentHeader
              title={`${user?.firstname} ${user?.lastname}`}
              iconConfig={{ icon: Edit }}
              href={`/${user?.username}/settings/edit`}
            />
          ) : (
            <ComponentHeader
              title={`${user?.firstname} ${user?.lastname}`}
              follow={user?.id}
              isAlreadyFollowing={isAlreadyFollowing}
            />
          )}
          <div className="border-r border-gray-300">
            <UserProfile />
            <div className="sticky top-[52px] z-[9] px-6 flex items-center justify-center gap-10 border-b border-gray-300 text-xs font-semibold bg-white">
              <Link className="py-2.5 border-b-2 text-[#00aa45] border-[#00aa45]">
                WORK
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
            {isOwnProfile && (
              <div className="pt-8 pb-10 w-full px-6">
                <h1 className="font-medium mb-4">Showcase your work from:</h1>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                  {integrations?.map((integration) => (
                    <div
                      key={integration.id}
                      onClick={() => {
                        if (integration.title === "Github") {
                          loginGithub();
                        } else {
                          showModal("integration", {
                            integration: integration,
                          });
                        }
                      }}
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
            )}
            <AddProject projects={user?.projects} isOwnProfile={isOwnProfile} />
            {user?.github.length !== 0 && (
              <GithubDetails
                isOwnProfile={isOwnProfile}
                github={user?.github}
              />
            )}
          </div>
        </div>
        <Rightsidebar>
          <div className="mt-8 flex flex-col gap-4 px-6">
            <HighlightCard user={user} />
          </div>
        </Rightsidebar>
      </div>
    </Sidebar>
  );
};

export default Profile;
