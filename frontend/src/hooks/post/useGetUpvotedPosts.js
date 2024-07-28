import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchupvotedPosts = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/posts/liked-posts`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

const useGetUpvotedPosts = () => {
  return useQuery({
    queryKey: ["upvotedPosts"],
    queryFn: fetchupvotedPosts,
  });
};

export default useGetUpvotedPosts;
