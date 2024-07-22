import React from "react";
import Sidebar from "../components/utils/Sidebar";
import { Edit, Loader2 } from "lucide-react";
import ComponentHeader from "../components/utils/ComponentHeader";
import Rightsidebar from "../components/utils/Rightsidebar";
import UserProfile from "../components/profile/UserProfile";
import { Link, useParams } from "react-router-dom";
import useUserProfile from "../hooks/profile/useUserProfile";
import { useSelector } from "react-redux";
import PostCard from "../components/scroll/PostCard";
import useGetPostsByUsername from "../hooks/post/useGetPostbyUsername";
import ProfileSkeleton from "../components/utils/ProfileSkeleton";
import HighlightCard from "../components/profile/HighlightCard";

const UserPosts = () => {
  const { id } = useParams();
  const { data, isLoading } = useUserProfile(id);
  const { data: userPosts, isLoading: postLoading } = useGetPostsByUsername(id);
  const posts = userPosts?.data;
  console.log(userPosts);
  const loggedInUser = useSelector((state) => state.user.user);
  const user = data?.data;
  const isOwnProfile = loggedInUser?.username === user?.username;
  if (isLoading) {
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
                className="py-2.5 hover:border-gray-600 hover:border-b-2"
              >
                RESUME
              </Link>
              <Link className="py-2.5 text-[#00aa45] border-b-2  border-[#00aa45]  hover:border-b-2">
                POSTS •&nbsp; {user?._count.posts}
              </Link>
            </div>
            <div className="pt-8 pb-10 w-full">
              {postLoading ? (
                <div className="w-full flex items-center justify-center animate-spin">
                  <Loader2 className="text-green-600" />
                </div>
              ) : (
                <>
                  {posts?.map((post) => (
                    <PostCard post={post} key={post.id} />
                  ))}
                </>
              )}
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

export default UserPosts;
