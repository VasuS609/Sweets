'use client';

import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

const Confetti = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });
  const [run, setRun] = useState(true);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Stop creating new confetti after 3 seconds
    // Existing pieces will fall naturally
    const timer = setTimeout(() => {
      setRun(false);
    }, 7500);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={run} // When false, existing pieces fall and no new ones are created
      numberOfPieces={run ? 200 : 0}
    />
  );
};

export default Confetti;