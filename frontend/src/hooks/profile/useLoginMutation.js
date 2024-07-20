import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/ModalContext";
import { setUser } from "../../store/userSlice";
import { toast } from "react-toastify";

const loginUser = async (credentials) => {
  const response = await axios.post(
    `http://localhost:4000/users/login`,
    credentials
  );
  return response.data;
};

export const useLoginMutation = () => {
  const { hideModal } = useModal();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginUser,
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
