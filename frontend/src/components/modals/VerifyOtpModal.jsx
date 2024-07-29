import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Button from "../utils/ui/Button";
import { useVerifyOtp } from "../../hooks/profile/useVerifyOtp";
import { X } from "lucide-react";
import { useModal } from "../../context/ModalContext";
const VerifyOtpModal = () => {
  const [otp, setOtp] = useState("");
  const verifyOtp = useVerifyOtp();
  const handleVerify = async () => {
    verifyOtp.mutate({ otp: otp });
  };
  const { hideModal } = useModal();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed hover:cursor-default inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
    >
      <div className="bg-white md:w-[380px] w-[350px]  rounded-lg shadow-lg flex flex-col items-center relative">
        <div className="py-4 px-6 flex items-center flex-col">
          <h1 className="text-sm font-semibold">Check Your Mail</h1>
          <p className="mt-2 text-xs text-gray-600">
            Enter the Verification code sent on email
          </p>
          <div className="mt-4">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputStyle={{
                border: "1px solid",
                borderRadius: "4px",
                width: "40px",
                height: "40px",
                fontSize: "12px",
                color: "#000",
                fontWeight: "400",
                caretColor: "green",
              }}
              renderSeparator={<span className="opacity-0"> - </span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
        </div>
        <div className="px-4 py-3 flex items-end justify-end border-t border-gray-300 w-full">
          <Button
            title="Verify"
            onClick={handleVerify}
            className="bg-[#00aa45] text-xs text-white border-2 border-[#219653] rounded-full px-3.5 py-0.5 hover:bg-[#219653] "
          />
        </div>
        <div className="absolute top-3 right-3">
          <X
            onClick={() => {
              hideModal();
            }}
            className="cursor-pointer"
            size={18}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpModal;
