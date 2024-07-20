import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPostsByUsername = async (username) => {
  const response = await axios.get(
    `http://localhost:4000/posts/${username}/posts`,
    {}
  );
  return response.data;
};

const useGetPostsByUsername = (username) => {
  return useQuery({
    queryKey: ["posts", username],
    queryFn: () => fetchPostsByUsername(username),
    enabled: !!username, // Ensure the query runs only if a username is provided
  });
};

export default useGetPostsByUsername;
