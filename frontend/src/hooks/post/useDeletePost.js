// hooks/useDeleteProjectMutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";

const deletePost = async (id) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  const { hideModal } = useModal();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      toast.success("Post Deleted Successfully!");
      hideModal();
      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
