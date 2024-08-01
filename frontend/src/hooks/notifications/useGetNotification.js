import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getNotifications = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/notifications`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
};

export default useGetNotifications;
