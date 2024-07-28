// hooks/useUpdateProfileMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "react-toastify";
import { toast } from "react-toastify";
const updatePassword = async (data) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BASE_URL}/users/chnage-password`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      toast.success("Password Updated!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
