"use client";
import React from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

const Confetti = () => {
  const { width, height } = useWindowSize();

  return (
    <ReactConfetti
      width={screen.width}
      height={screen.height}
      recycle={false}
      numberOfPieces={750}
      gravity={0.3}
    />
  );
};

export default Confetti;