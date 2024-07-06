// hooks/useLoginMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const addProject = async (data) => {
  console.log("data", data);
  const response = await axios.post(`http://localhost:4000/projects`, data, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return response.data;
};

export const useAddProjectMutation = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  return useMutation({
    mutationFn: addProject,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Project Added Successfully!");
      navigate(`/${user.username}`);
    },
    onError: (error) => {
      console.error("Project failed:", error.name);
      console.log(error.message);
    },
  });
};