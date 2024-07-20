import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserProfile = async () => {
  const response = await axios.get(`http://localhost:4000/users`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return response.data;
};

const useGetAllProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile, // This line is corrected
  });
};

export default useGetAllProfile;
