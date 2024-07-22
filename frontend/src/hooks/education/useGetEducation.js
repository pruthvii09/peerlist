import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchEducation = async (username) => {
  const response = await axios.get(
    `http://localhost:4000/education/${username}`
  );
  return response.data;
};

const useFetchEducation = (username) => {
  return useQuery({
    queryKey: ["fetchEducation", username],
    queryFn: () => fetchEducation(username),
    enabled: !!username, // Ensures the query only runs if username is truthy
  });
};

export default useFetchEducation;
