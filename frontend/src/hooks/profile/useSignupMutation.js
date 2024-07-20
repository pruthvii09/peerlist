// hooks/useLoginMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/ModalContext";
import { setUser } from "../../store/userSlice";
import { toast } from "react-toastify";

const signupUser = async (credentials) => {
  const response = await axios.post(
    `http://localhost:4000/users/signup`,
    credentials
  );
  return response.data;
};

export const useSignupMutation = () => {
  const dispatch = useDispatch();
  const { hideModal } = useModal();
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", JSON.stringify(data?.data?.token));
      dispatch(setUser(data.data));
      hideModal();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
