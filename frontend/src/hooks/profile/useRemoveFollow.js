import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const removeUser = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/users/unfollow/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useUnFollowUser = () => {
  return useMutation({
    mutationFn: removeUser,
    onSuccess: () => {
      //   toast.success("Followed User");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
