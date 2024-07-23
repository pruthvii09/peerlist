import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAllFollowerFollowing = async (username) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/users/allfollow/${username}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

const useGetFollowerFollowing = (username) => {
  return useQuery({
    queryKey: ["useGetFollowerFollowing", username],
    queryFn: () => fetchAllFollowerFollowing(username),
    enabled: !!username, // Ensures the query only runs if username is truthy
  });
};

export default useGetFollowerFollowing;
