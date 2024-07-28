import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

const verifyOtp = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/users/verify-otp`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useVerifyOtp = () => {
  const { hideModal } = useModal();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", JSON.stringify(data?.data?.token));
      dispatch(setUser(data.data));
      hideModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
