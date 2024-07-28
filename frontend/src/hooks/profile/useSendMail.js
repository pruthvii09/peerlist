import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";

const sendMail = async () => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/users/send-verification-email`,
    {},
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useSendMail = () => {
  const { showModal } = useModal();
  return useMutation({
    mutationFn: sendMail,
    onSuccess: () => {
      toast.success("Verification code sent successfully");
      showModal("verify");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
};
