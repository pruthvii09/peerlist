// hooks/useLoginMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/ModalContext";
import { setUser } from "../../store/userSlice";

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
      console.error("Signup failed:", error.name);
      console.log(error.message);
    },
  });
};
