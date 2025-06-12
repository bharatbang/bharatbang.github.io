
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
            className="flex-shrink-0 w-full h-full snap-center flex items-center justify-center p-4" // Outer cell for snapping and centering
          >
            {/* Inner "mobile story" card */}
            <div
              className="
                h-[80vh]            /* Relative height */
                max-h-[600px]       /* Max pixel height */
                aspect-[9/16]       /* Portrait aspect ratio */
                w-auto                /* Width determined by height and aspect ratio */
                flex flex-col         /* For internal content layout */
                items-center          /* Center content horizontally */
                justify-center        /* Center content vertically if space allows */
                rounded-2xl           /* More pronounced rounding */
                shadow-2xl            /* Stronger shadow */
                overflow-y-auto       /* Scroll for long quotes */
                p-6 sm:p-8            /* Padding inside the card */
                text-center           /* Default text alignment */
                transition-colors duration-300
              "
              style={{
                background: index % 2 === 0
                  ? 'linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)'
                  : 'linear-gradient(145deg, hsl(var(--primary)) 20%, hsl(var(--accent)) 100%)',
                color: index % 2 === 0 ? 'hsl(var(--card-foreground))' : 'hsl(var(--primary-foreground))',
              }}
            >
              <blockquote className="flex-grow w-full flex items-center justify-center">
                <p className="text-lg sm:text-xl md:text-2xl font-serif italic leading-relaxed">
                  “{quote}”
                </p>
              </blockquote>
              <p className="mt-auto pt-4 text-sm sm:text-base md:text-lg font-semibold flex-shrink-0">
                - Mark Twain
              </p>
            </div>
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
