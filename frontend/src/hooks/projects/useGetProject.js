import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProjectById = async (projectId) => {
  const response = await axios.get(
    `http://localhost:4000/projects/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

const useProjectById = (projectId) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProjectById(projectId),
    enabled: !!projectId, // Ensure the query is only enabled when projectId is truthy
  });
};

export default useProjectById;
