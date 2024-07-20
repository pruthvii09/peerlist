import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchWork = async (username) => {
  const response = await axios.get(`http://localhost:4000/works/${username}`);
  return response.data;
};

const useFetchWork = (username) => {
  return useQuery({
    queryKey: ["fetchWork", username],
    queryFn: () => fetchWork(username),
    enabled: !!username, // Ensures the query only runs if username is truthy
  });
};

export default useFetchWork;
