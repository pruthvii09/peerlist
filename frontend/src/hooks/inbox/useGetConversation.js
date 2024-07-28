import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getConversations = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/messages/get-conversations`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

const useGetConversations = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });
};

export default useGetConversations;
