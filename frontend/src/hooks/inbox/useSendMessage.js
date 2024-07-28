// hooks/useLoginMutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const sendMessage = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/messages/send`,
    data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }
  );
  return response.data;
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      toast.success("Message Added Successfully!");
      queryClient.invalidateQueries("conversations");
      queryClient.invalidateQueries("messages");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
};
