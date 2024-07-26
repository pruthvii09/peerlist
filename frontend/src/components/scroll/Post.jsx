import React from "react";
import PostInput from "./PostInput";
import PostCard from "./PostCard";
import useGetPosts from "../../hooks/post/useGetPosts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Post = () => {
  // const posts = useSelector((store) => store?.post.posts);
  const { data, isLoading } = useGetPosts();
  const posts = data?.data;
  if (isLoading) {
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
      <PostInput />
      {posts?.map((post) => {
        return <PostCard key={post?.id} post={post} />;
      })}
    </div>
  );
};

export default Post;
