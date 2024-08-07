// context/ModalContext.js
import React, { createContext, useContext, useState } from "react";
import LoginModal from "../components/modals/LoginModal";
import SignupModal from "../components/modals/SignupModal";
import PostModal from "../components/modals/PostModal";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import PreferenceModal from "../components/modals/PreferenceModal";
import EditPostModal from "../components/modals/EditPostModal";
import LaunchProject from "../components/modals/LaunchProject";
import IntegrationModal from "../components/modals/IntegrationModal";
import SearchModal from "../components/modals/SearchModal";
import VerifyOtpModal from "../components/modals/VerifyOtpModal";
import ImageModal from "../components/modals/ImageModal";

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
    case "editpost":
      return <EditPostModal {...modalProps} />;
    case "launchproject":
      return <LaunchProject {...modalProps} />;
    case "integration":
      return <IntegrationModal {...modalProps} />;
    case "search":
      return <SearchModal {...modalProps} />;
    case "verify":
      return <VerifyOtpModal {...modalProps} />;
    case "image":
      return <ImageModal {...modalProps} />;
    default:
      return null;
  }
};
