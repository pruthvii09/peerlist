import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSingleWork = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/works/single-work/${id}`
  );
  return response.data;
};

const useFetchSingleWork = (id) => {
  return useQuery({
    queryKey: ["fetchSingleWork", id],
    queryFn: () => fetchSingleWork(id),
    enabled: !!id, // Ensures the query only runs if username is truthy
  });
};

export default useFetchSingleWork;
