import React from "react";
import Button from "../utils/ui/Button";
import { X } from "lucide-react";
import { useModal } from "../../context/ModalContext";

const IntegrationModal = ({ integration }) => {
  const { hideModal } = useModal();
  return (
    <div className="fixed hover:cursor-default inset-0 z-[9999999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white md:w-[350px] w-[350px]  rounded-lg shadow-lg relative"
      >
        <div className="p-4">
          <div className="flex items-center justify-center">
            <img src={integration.image} className="w-10 h-10" alt="" />
          </div>
          <div className="flex justify-center flex-col gap-1 items-center mt-3 mb-6">
            <h1 className="text-sm font-semibold">
              Connect with {integration.title}
            </h1>
            <span className="text-xs text-gray-700">
              Share your {integration.title} username
            </span>
          </div>
          <div className="border border-gray-300 rounded-lg py-0.5 px-2">
            <div className="text-xs text-gray-600">
              {integration.title} username
              <span className="text-red-600">*</span>
            </div>
            <input className="outline-none w-full" type="text" />
          </div>
          <span className="text-gray-600 text-xs">
            Note: Only enter username
          </span>
        </div>
        <div className="px-4 py-3 rounded-lg bg-gray-100 flex justify-between items-center">
          <Button
            onClick={() => hideModal()}
            className="px-3 py-1 text-xs border rounded-full border-gray-300"
            title="Cancel"
          />
          <Button
            className="px-3 py-1 text-xs text-white rounded-full bg-black"
            title="Connect"
          />
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
    </div>
  );
};

export default IntegrationModal;
