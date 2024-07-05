import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProjects = async () => {
  const response = await axios.get("http://localhost:4000/projects", {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return response.data;
};

const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
};

export default useProjects;
