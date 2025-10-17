"use client";
import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const Confetti = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    if (!dimensions.width || !dimensions.height) return null;

    return (
        <ReactConfetti
            width={dimensions.width}
            height={dimensions.height}
            recycle={false}
            numberOfPieces={250}
            gravity={0.3}
        />
    );
};

export default Confetti;