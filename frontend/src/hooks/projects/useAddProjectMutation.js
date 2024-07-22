// hooks/useLoginMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const addProject = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/projects`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useAddProjectMutation = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  return useMutation({
    mutationFn: addProject,
    onSuccess: (data) => {
      toast.success("Project Added Successfully!");
      navigate(`/user/${user.username}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
