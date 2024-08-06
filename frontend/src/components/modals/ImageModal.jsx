import { X } from "lucide-react";
import React from "react";
import { useModal } from "../../context/ModalContext";

const ImageModal = ({ image }) => {
  const { hideModal } = useModal();
  return (
    <div
      //onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-80"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" mx-4 sm:mx-auto py-6 px-4 rounded-lg shadow-lg flex flex-col relative max-w-3xl w-full"
      >
        <button
          onClick={() => hideModal()}
          className="absolute top-3 right-3 bg-gray-800 text-white rounded-full p-1.5 hover:bg-gray-700 focus:outline-none"
        >
          <X size={16} />
        </button>
        <img
          src={image.url}
          alt="Preview"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default ImageModal;
