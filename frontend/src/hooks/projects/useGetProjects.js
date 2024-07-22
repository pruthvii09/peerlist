import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProjects = async () => {
  const response = await axios.get(
    "${process.env.REACT_APP_BASE_URL}/projects",
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
};

export default useProjects;
