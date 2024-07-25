// hooks/useLoginMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const removeUpvote = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/posts/removeupvote`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useRemoveUpvotePost = () => {
  //   const queryClient = new QueryClient();
  return useMutation({
    mutationFn: removeUpvote,
    onSuccess: () => {
      //   toast.success("Upvote Added Successfully!");
      //   queryClient.invalidateQueries("fetchSpotlight");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
