// hooks/useLoginMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const updateProject = async ({ id, data }) => {
  const response = await axios.patch(
    `http://localhost:4000/projects/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useUpdateProjectMutation = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  return useMutation({
    mutationFn: updateProject,
    onSuccess: (data) => {
      toast.success("Project Updated Successfully!");
      navigate(`/${user.username}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
