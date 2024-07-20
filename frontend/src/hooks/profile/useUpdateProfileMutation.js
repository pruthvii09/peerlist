// hooks/useUpdateProfileMutation.js
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import axios from "axios";
import "react-toastify";
import { toast } from "react-toastify";
import { setUser } from "../../store/userSlice";
import { useModal } from "../../context/ModalContext";
const updateProfile = async (profileData) => {
  const response = await axios.patch(
    `http://localhost:4000/users`,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};
export const useUpdateProfileMutation = () => {
  const dispatch = useDispatch();
  const { hideModal } = useModal();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.data));
      dispatch(setUser(data.data));
      hideModal();
      toast.success("Profile Updated!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
