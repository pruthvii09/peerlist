import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";

const deleteGithub = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/users/removegithub`,
    {},
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useRemoveGit = () => {
  const queryClient = useQueryClient();
  const { hideModal } = useModal();
  return useMutation({
    mutationFn: deleteGithub,
    onSuccess: () => {
      toast.success("Github account removed");
      hideModal();
      queryClient.invalidateQueries("userProfile");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
