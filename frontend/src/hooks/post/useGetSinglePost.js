import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSinglePost = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/posts/${id}`
  );
  return response.data;
};

const useFetchSinglePost = (id) => {
  return useQuery({
    queryKey: ["userSinglePost", id],
    queryFn: () => fetchSinglePost(id),
    enabled: !!id, // Ensures the query only runs if username is truthy
  });
};

export default useFetchSinglePost;