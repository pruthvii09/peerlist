// hooks/useLoginMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const editWork = async ({ data, id }) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BASE_URL}/works/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useEditWork = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  return useMutation({
    mutationFn: editWork,
    onSuccess: (data) => {
      toast.success("Work Edited Successfully!");
      navigate(`/${user.username}/resume`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
