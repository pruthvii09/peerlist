// hooks/useLoginMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const addEducation = async (data) => {
  const response = await axios.post(`http://localhost:4000/education`, data, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });
  return response.data;
};

export const useAddEducation = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  return useMutation({
    mutationFn: addEducation,
    onSuccess: (data) => {
      toast.success("Education Added Successfully!");
      navigate(`/${user.username}/resume`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
