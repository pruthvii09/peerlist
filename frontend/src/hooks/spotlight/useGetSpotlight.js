import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSpotlight = async (week) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/spotlight?weekNumber=${week}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

const useGetSpotlight = (week) => {
  return useQuery({
    queryKey: ["fetchSpotlight", week],
    queryFn: () => fetchSpotlight(week),
    enabled: !!week, // Ensure the query is only enabled when projectId is truthy
  });
};

export default useGetSpotlight;
