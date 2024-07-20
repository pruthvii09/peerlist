import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";

const addPost = async (data) => {
  try {
    const response = await axios.post(`http://localhost:4000/posts`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add post");
  }
};

export const useAddPost = () => {
  const { hideModal } = useModal();
  return useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      toast.success("Post Added Successfully!");
      hideModal();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
