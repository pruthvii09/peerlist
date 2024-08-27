import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchJob = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/jobs`);
  return response.data;
};

const useFetchJob = () => {
  return useQuery({
    queryKey: ["fetchJob"],
    queryFn: () => fetchJob(),
  });
};

export default useFetchJob;
