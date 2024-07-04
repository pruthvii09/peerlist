// hooks/useLoginMutation.js
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { closeLoginModal } from "../store/modalSlice";
import { setUser } from "../store/userSlice";

const loginUser = async (credentials) => {
  const response = await axios.post(
    `http://localhost:4000/users/login`,
    credentials
  );
  return response.data;
};

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.data));
      dispatch(setUser(data.data));
      dispatch(closeLoginModal());
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });
};
