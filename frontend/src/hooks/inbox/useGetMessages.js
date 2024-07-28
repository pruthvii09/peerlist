import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getMessages = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/messages/conversation/${id}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

const useGetMessages = (id) => {
  return useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMessages(id),
    enabled: !!id,
  });
};

export default useGetMessages;
