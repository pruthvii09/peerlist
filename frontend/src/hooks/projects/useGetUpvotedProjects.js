import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUpvotedProjects = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/projects/get-upvoted-projects`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

const useGetUpvotedProjects = () => {
  return useQuery({
    queryKey: ["upvotedProjects"],
    queryFn: getUpvotedProjects,
  });
};

export default useGetUpvotedProjects;
