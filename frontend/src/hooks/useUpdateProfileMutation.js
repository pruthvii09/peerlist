// hooks/useUpdateProfileMutation.js
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import axios from "axios";
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

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.data));
      dispatch(setUser(data.data));
      console.log("Profile updated successfully");
    },
    onError: (error) => {
      console.error("Profile update failed:", error.name);
      console.log(error.message);
    },
  });
};
