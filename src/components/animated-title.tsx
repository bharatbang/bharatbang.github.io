"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';

interface AnimatedTitleProps {
  text: string;
  className?: string;
  animationSpeed?: number; // milliseconds per character
}

const AnimatedTitle: FC<AnimatedTitleProps> = ({ text, className, animationSpeed = 200 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Reset displayed text if the input text changes, ensuring animation restarts correctly.
    setDisplayedText(''); 
    
    let currentLength = 0;
    const intervalId = setInterval(() => {
      if (currentLength < text.length) {
        currentLength++;
        setDisplayedText(text.substring(0, currentLength));
      } else {
        clearInterval(intervalId);
      }
    }, animationSpeed);

    // Cleanup function to clear the interval when the component unmounts or dependencies change.
    return () => clearInterval(intervalId);
  }, [text, animationSpeed]); // Dependencies for the effect

  return <h1 className={className}>{displayedText}</h1>;
};

export default AnimatedTitle;
