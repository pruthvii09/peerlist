import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserProfile = async (username) => {
  const response = await axios.get(`http://localhost:4000/users/${username}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return response.data;
};

const useUserProfile = (username) => {
  return useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => fetchUserProfile(username),
    enabled: !!username, // Ensures the query only runs if username is truthy
  });
};

export default useUserProfile;
