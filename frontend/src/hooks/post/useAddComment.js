// hooks/useLoginMutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const addComment = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/posts/comment`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries("userSinglePost");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
