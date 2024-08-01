// hooks/useUpdateProfileMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "react-toastify";
import { toast } from "react-toastify";
const recordView = async (profileId) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/users/profile-views/${profileId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};
export const useRecordView = () => {
  return useMutation({
    mutationFn: recordView,
    onSuccess: () => {
      //   toast.success("Profile Viewd!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
