// hooks/useLoginMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";
import { useConfetti } from "../../context/ConfettiContext";

const launchProject = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/spotlight/launch`,
    { projectId: data },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useLaunchProjectMutation = () => {
  const { hideModal } = useModal();
  const { triggerConfetti } = useConfetti();
  return useMutation({
    mutationFn: launchProject,
    onSuccess: () => {
      toast.success("Project Launched Successfully!");
      hideModal();
      triggerConfetti();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
