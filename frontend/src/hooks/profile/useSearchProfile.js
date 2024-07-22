import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const searchProfile = async (query) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/users/search?query=${query}`
  );
  return response.data;
};

const useSearchProfile = (query) => {
  return useQuery({
    queryKey: ["searchProfile", query],
    queryFn: () => searchProfile(query),
    enabled: !!query, // Ensures the query only runs if username is truthy
  });
};

export default useSearchProfile;