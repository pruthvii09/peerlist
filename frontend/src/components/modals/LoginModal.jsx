import React from "react";
import Button from "../utils/ui/Button";
import { ArrowRight, X } from "lucide-react";
import Input from "../utils/ui/Input";
const LoginModal = () => {
  return (
    <div className="fixed hover:cursor-default inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white sm:w-[380px] w-[350px] py-10 px-6 rounded-lg shadow-lg flex flex-col items-center relative"
      >
        <h1 className="font-instrumentic text-[40px]">Log in</h1>
        <div className="w-full flex flex-col gap-3">
          <Input label="Email" />
          <Input label="Password" />
        </div>
        <div className="mt-4 w-full">
          <Button
            className="text-white flex items-center justify-center text-center w-full font-medium bg-[#24292e] rounded-full px-6 py-2"
            title="Login"
            iconConfig={{ icon: ArrowRight, size: 20 }}
          />
        </div>
        <div className="absolute top-3 right-3">
          <X className="cursor-pointer" size={18} />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
