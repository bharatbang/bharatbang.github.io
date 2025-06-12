
'use client';

import React, { useRef } from 'react';
import { markTwainQuotes } from '@/data/quotes';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function StoriesClient() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center bg-transparent relative">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory w-full flex-grow scrollbar-hide"
      >
        {markTwainQuotes.map((quote, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full snap-center flex flex-col items-center justify-center p-8 md:p-16 transition-colors duration-300"
            style={{
              background: index % 2 === 0
                ? 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)'
                : 'linear-gradient(135deg, hsl(var(--primary)) 20%, hsl(var(--accent)) 100%)',
              color: index % 2 === 0 ? 'hsl(var(--card-foreground))' : 'hsl(var(--primary-foreground))',
            }}
          >
            <blockquote className="max-w-3xl">
              <p className="text-xl md:text-3xl lg:text-4xl font-serif text-center italic leading-relaxed">
                “{quote}”
              </p>
            </blockquote>
            <p className="mt-6 text-lg md:text-xl font-semibold">- Mark Twain</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-4 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => scroll('left')} 
          className="bg-background/80 hover:bg-background text-foreground rounded-full shadow-md"
          aria-label="Previous Story"
        >
          <ChevronLeft />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => scroll('right')} 
          className="bg-background/80 hover:bg-background text-foreground rounded-full shadow-md"
          aria-label="Next Story"
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs sm:text-sm text-muted-foreground z-10 bg-background/80 px-3 py-1.5 rounded-full shadow">
        Scroll or use arrows to navigate stories
      </div>
    </div>
  );
}
