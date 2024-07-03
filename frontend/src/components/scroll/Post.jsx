import React from "react";
import PostInput from "./PostInput";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";

const Post = () => {
  const posts = useSelector((store) => store?.post.posts);
  console.log(posts);
  return (
    <div className="pt-14">
      <PostInput />
      {posts?.map((post) => (
        <PostCard key={post?.id} post={post} />
      ))}
    </div>
  );
};

export default Post;
