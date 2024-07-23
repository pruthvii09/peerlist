// hooks/useLoginMutation.js
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const addUpvote = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/spotlight/upvote`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useAddUpvote = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: addUpvote,
    onSuccess: () => {
      toast.success("Upvote Added Successfully!");
      queryClient.invalidateQueries("fetchSpotlight");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
