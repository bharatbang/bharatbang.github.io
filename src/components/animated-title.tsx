'use client';

import { useState, useEffect } from 'react';
import type { HTMLAttributes } from 'react';
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
    setDisplayedText('');
    setIsAnimationComplete(false);
    let startTimeoutId: NodeJS.Timeout;
    let typingIntervalId: NodeJS.Timeout;

    if (text) {
      startTimeoutId = setTimeout(() => {
        let currentIndex = 0;
        typingIntervalId = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayedText((prev) => prev + text[currentIndex]);
            currentIndex++;
          } else {
            clearInterval(typingIntervalId);
            setIsAnimationComplete(true);
          }
        }, typingSpeed);
      }, initialDelay);
    }

    return () => {
      clearTimeout(startTimeoutId);
      clearInterval(typingIntervalId);
    };
  }, [text, initialDelay, typingSpeed]);
  
  const minHeightClass = () => {
    switch (Tag) {
      case 'h1': return 'min-h-[1.2em]'; // Adjusted for potentially larger h1
      case 'h2': return 'min-h-[1.2em]'; // Adjusted for h2
      default: return 'min-h-[1em]';
    }
  }

  return (
    <Tag
      className={cn(
        className,
        minHeightClass() // Apply dynamic min-height
      )}
      {...props}
    >
      {displayedText}
      {showCursor && !isAnimationComplete && (
        <span className="inline-block animate-pulse ml-0.5">|</span>
      )}
    </Tag>
  );
};

export default AnimatedTitle;
