// context/ModalContext.js
import React, { createContext, useContext, useState } from "react";
import LoginModal from "../components/modals/LoginModal";
import SignupModal from "../components/modals/SignupModal";
import PostModal from "../components/modals/PostModal";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import PreferenceModal from "../components/modals/PreferenceModal";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  const showModal = (modalType, modalProps = {}) => {
    setModal({ modalType, modalProps });
  };

  const hideModal = () => {
    setModal(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modal && <ModalContainer {...modal} />}
    </ModalContext.Provider>
  );
};

const ModalContainer = ({ modalType, modalProps }) => {
  switch (modalType) {
    case "login":
      return <LoginModal {...modalProps} />;
    case "signup":
      return <SignupModal {...modalProps} />;
    // Add more cases for different modals as needed
    case "post":
      return <PostModal {...modalProps} />;
    case "confirm":
      return <ConfirmationModal {...modalProps} />;
    case "preference":
      return <PreferenceModal {...modalProps} />;
    default:
      return null;
  }
};
