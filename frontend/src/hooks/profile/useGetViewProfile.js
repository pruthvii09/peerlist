import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getViewCount = async (daysAgo) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/users/profile-views?days=${daysAgo}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

const useGetViewCount = (daysAgo) => {
  return useQuery({
    queryKey: ["getViewCount"],
    queryFn: () => getViewCount(daysAgo), // This line is corrected
    enabled: !!daysAgo,
  });
};

export default useGetViewCount;
