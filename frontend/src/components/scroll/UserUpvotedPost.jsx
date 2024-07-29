import React, { useState } from "react";
import PostCard from "./PostCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useGetUpvotedPosts from "../../hooks/post/useGetUpvotedPosts";
import useGetUpvotedProjects from "../../hooks/projects/useGetUpvotedProjects";
import ProjectCard from "../projects/ProjectCard";
const UserUpvotedPost = () => {
  // const posts = useSelector((store) => store?.post.posts);
  const { data: posts, isLoading: postLoading } = useGetUpvotedPosts();
  const { data, isLoading: projectLoading } = useGetUpvotedProjects();
  const projects = data?.projects;
  const [toggle, setToggle] = useState(false);
  if (postLoading || projectLoading) {
    return (
      <div className="mt-14">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="px-3 border-r md:px-6 py-3 md:py-4 border-b border-gray-300"
          >
            <div className="flex justify-between items-start md:items-center">
              <div className="flex gap-2 md:gap-3">
                <Skeleton circle width={40} height={40} />
                <div className="leading-tight">
                  <Skeleton width={120} />
                  <Skeleton width={180} />
                </div>
              </div>
              <Skeleton width={20} height={20} />
            </div>
            <div className="flex flex-col mt-2 md:mt-3">
              <Skeleton count={3} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="pt-14 border-r border-gray-300 pb-24">
      <div className="flex sticky bg-white z-[99] top-[56px] items-center justify-center px-6 gap-4 border-b border-gray-300">
        <div
          onClick={() => setToggle(!toggle)}
          className={`px-8 py-2.5 font-medium text-xs  cursor-pointer hover:border-b-2 border-gray-600 ${
            toggle ? "border-b-2 border-green-600 text-green-600" : ""
          }`}
        >
          POSTS
        </div>
        <div
          onClick={() => setToggle(!toggle)}
          className={`px-8 py-2.5 font-medium text-xs hover:border-b-2 border-gray-600  cursor-pointer ${
            !toggle ? "border-b-2 border-green-600 text-green-600" : ""
          }`}
        >
          PROJECTS
        </div>
      </div>
      {toggle ? (
        <>
          {posts?.map((post) => {
            return <PostCard key={post?.id} post={post} />;
          })}
        </>
      ) : (
        <>
          {projects?.map((project) => (
            <ProjectCard data={project} key={project.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default UserUpvotedPost;
