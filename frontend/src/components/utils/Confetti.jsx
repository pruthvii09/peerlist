// Confetti.js
import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useConfetti } from "../../context/ConfettiContext"; // Adjust path if necessary

const Confetti = () => {
  const { showConfetti } = useConfetti();
  const [windowDim, setWindowDim] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectSize = () => {
    setWindowDim({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, []);

  if (!showConfetti) return null;

  return (
    <ReactConfetti
      width={windowDim.width}
      height={windowDim.height}
      tweenDuration={1000}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }} // Ensure confetti is above other elements
    />
  );
};

export default Confetti;
