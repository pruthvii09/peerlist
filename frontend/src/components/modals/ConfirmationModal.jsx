import { Trash2, X } from "lucide-react";
import React from "react";
import Button from "../utils/ui/Button";
import { useModal } from "../../context/ModalContext";
const ConfirmationModal = ({ onConfirm }) => {
  const { hideModal } = useModal();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed hover:cursor-default inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white sm:w-[380px] w-[350px]  rounded-lg shadow-lg flex flex-col items-center relative">
        <div className="flex py-6 px-6 flex-col items-center">
          <div>
            <Trash2 />
          </div>
          <h1 className="text-sm font-semibold mt-4">Are you sure?</h1>
        </div>
        <div className="border-t px-4 py-2 w-full flex items-center justify-between">
          <Button
            title="Cancle"
            onClick={() => {
              hideModal();
            }}
            className="text-xs font-semibold py-1 rounded-full px-3 border border-gray-300"
          />
          <Button
            title="Yes, remove"
            onClick={onConfirm}
            className="text-white font-medium bg-black rounded-full text-xs px-2 py-1"
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

export default ConfirmationModal;
