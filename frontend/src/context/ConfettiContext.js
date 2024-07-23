// ConfettiContext.js
import React, { createContext, useContext, useState } from "react";

const ConfettiContext = createContext();

export const ConfettiProvider = ({ children }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    console.log("Hello Confeettikj");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 3 seconds
  };

  return (
    <ConfettiContext.Provider value={{ showConfetti, triggerConfetti }}>
      {children}
    </ConfettiContext.Provider>
  );
};

export const useConfetti = () => useContext(ConfettiContext);
