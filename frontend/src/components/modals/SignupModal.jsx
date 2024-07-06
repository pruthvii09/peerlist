import React, { useState } from "react";
import Button from "../utils/ui/Button";
import { ArrowRight, X } from "lucide-react";
import Input from "../utils/ui/Input";
import { useModal } from "../../context/ModalContext";
import { useSignupMutation } from "../../hooks/profile/useSignupMutation";
const SignupModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupMutation = useSignupMutation();
  const { hideModal } = useModal();
  const handleSubmit = async () => {
    if (!email || !password) return;
    signupMutation.mutate({ email, password });
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed hover:cursor-default inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white sm:w-[380px] w-[350px] py-10 px-6 rounded-lg shadow-lg flex flex-col items-center relative">
        <h1 className="font-instrumentic text-[40px]">Sign up</h1>
        <div className="w-full flex flex-col gap-3">
          <Input
            label="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-4 w-full">
          <Button
            className="text-white flex items-center justify-center text-center w-full font-medium bg-[#24292e] rounded-full px-6 py-2"
            title="Signup"
            onClick={handleSubmit}
            iconConfig={{ icon: ArrowRight, size: 20 }}
          />
        </div>
        <div className="absolute top-3 right-3">
          <X onClick={() => hideModal()} className="cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
