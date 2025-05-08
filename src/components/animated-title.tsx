'use client';

import type { HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTitleProps extends HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  initialDelay?: number;
  typingSpeed?: number;
  className?: string;
  showCursor?: boolean;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  as: Tag = 'h1',
  initialDelay = 0,
  typingSpeed = 150,
  className,
  showCursor = true,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    // Reset state for new text or on re-mount/prop change
    setDisplayedText('');
    setIsAnimationComplete(false);

    let startTimeoutId: NodeJS.Timeout | undefined;
    let typingIntervalId: NodeJS.Timer | undefined;

    if (text && text.length > 0) { // Only start animation if text is valid and not empty
      startTimeoutId = setTimeout(() => {
        let currentIndex = 0;
        typingIntervalId = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayedText((prev) => prev + text[currentIndex]);
            currentIndex++;
          } else {
            if (typingIntervalId) clearInterval(typingIntervalId);
            typingIntervalId = undefined; // Ensure it's marked as cleared
            setIsAnimationComplete(true);
          }
        }, typingSpeed);
      }, initialDelay);
    } else {
      // If text is null, undefined, or empty, consider animation complete
      setIsAnimationComplete(true);
    }

    // Cleanup function
    return () => {
      if (startTimeoutId) clearTimeout(startTimeoutId);
      if (typingIntervalId) clearInterval(typingIntervalId);
    };
  }, [text, initialDelay, typingSpeed]); // Dependencies for the effect

  const getMinHeightClass = () => {
    // Ensure a minimum height to prevent layout shift while text is appearing
    // The exact value might need tweaking based on font size and line height
    switch (Tag) {
      case 'h1':
        return 'min-h-[1.2em]'; 
      case 'h2':
        return 'min-h-[1.2em]'; 
      default:
        return 'min-h-[1em]'; 
    }
  };

  return (
    <Tag
      className={cn(
        className, 
        getMinHeightClass() 
      )}
      {...props}
    >
      {displayedText}
      {showCursor && !isAnimationComplete && (
        <span aria-hidden="true" className="inline-block animate-pulse select-none ml-0.5 pointer-events-none">
          |
        </span>
      )}
    </Tag>
  );
};

export default AnimatedTitle;
