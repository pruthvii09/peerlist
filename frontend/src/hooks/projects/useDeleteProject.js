// hooks/useDeleteProjectMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";

const deleteProject = async (id) => {
  const response = await axios.delete(`http://localhost:4000/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return response.data;
};

export const useDeleteProjectMutation = () => {
  const navigate = useNavigate();
  const { hideModal } = useModal();
  const { user } = useSelector((store) => store.user);
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: (data) => {
      toast.success("Project Deleted Successfully!");
      hideModal();
      navigate(`/user/${user.username}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
