import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserProfile = async (username) => {
  const authToken = JSON.parse(localStorage.getItem("token"));
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/users/${username}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        accessToken: `${accessToken}`,
      },
    }
  );
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
