import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async ({ pageParam = 1 }) => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
    params: {
      page: pageParam,
      limit: 10, // Or any limit you prefer
    },
  });
  return response.data;
};

const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};

export default useGetPosts;
