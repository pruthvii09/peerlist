// hooks/useUpdateProfileMutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "react-toastify";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";
const updatePost = async (data) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BASE_URL}/posts`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};
export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  const { hideModal } = useModal();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      toast.success("Post Updated!");
      hideModal();
      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
