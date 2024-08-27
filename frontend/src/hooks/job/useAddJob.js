// hooks/useLoginMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const addJob = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/jobs`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useAddJob = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  return useMutation({
    mutationFn: addJob,
    onSuccess: (data) => {
      toast.success("Job Added Successfully!");
      navigate(`/${user.username}/resume`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
