
'use client';

import React from 'react';
import Image from 'next/image';

interface AlbumItem {
  id: string;
  imageUrl: string;
  alt: string;
  dataAiHint: string;
  sizeClasses: string; // Tailwind size classes e.g., "w-32 h-32"
  positionClasses: string; // Tailwind position classes e.g., "absolute top-10 left-5"
  rotationClasses?: string; // Optional rotation e.g., "transform rotate-3"
  zIndex?: string; // Optional z-index e.g., "z-10"
}

const albumItems: AlbumItem[] = [
  { id: '1', imageUrl: 'https://placehold.co/400x400.png', alt: 'Abstract Pink Waves', dataAiHint: 'abstract pink', sizeClasses: 'w-32 h-32 md:w-48 md:h-48', positionClasses: 'absolute top-[5%] left-[5%]', rotationClasses: 'transform -rotate-6', zIndex: 'z-10' },
  { id: '2', imageUrl: 'https://placehold.co/300x300.png', alt: 'Pop Art Portrait', dataAiHint: 'popart portrait', sizeClasses: 'w-28 h-28 md:w-40 md:h-40', positionClasses: 'absolute top-[10%] left-[30%]', zIndex: 'z-0' },
  { id: '3', imageUrl: 'https://placehold.co/350x350.png', alt: 'Cowboy Silhouette', dataAiHint: 'cowboy silhouette', sizeClasses: 'w-40 h-40 md:w-56 md:h-56', positionClasses: 'absolute top-[20%] left-[15%]', rotationClasses: 'transform rotate-3', zIndex: 'z-20' },
  { id: '4', imageUrl: 'https://placehold.co/250x250.png', alt: 'Orange Gradient', dataAiHint: 'orange gradient', sizeClasses: 'w-36 h-36 md:w-44 md:h-44', positionClasses: 'absolute top-[8%] right-[25%]', zIndex: 'z-0' },
  { id: '5', imageUrl: 'https://placehold.co/450x450.png', alt: 'Purple Heart Shape', dataAiHint: 'purple heart', sizeClasses: 'w-40 h-40 md:w-60 md:h-60', positionClasses: 'absolute top-[15%] right-[8%]', rotationClasses: 'transform rotate-2', zIndex: 'z-10' },
  { id: '6', imageUrl: 'https://placehold.co/200x200.png', alt: 'Green Earth Globe', dataAiHint: 'earth globe', sizeClasses: 'w-24 h-24 md:w-32 md:h-32', positionClasses: 'absolute top-[2%] right-[2%]', zIndex: 'z-20' },
  { id: '7', imageUrl: 'https://placehold.co/320x320.png', alt: 'Purple Abstract Swirl', dataAiHint: 'purple abstract', sizeClasses: 'w-28 h-28 md:w-36 md:h-36', positionClasses: 'absolute bottom-[15%] left-[8%]', rotationClasses: 'transform -rotate-3', zIndex: 'z-0' },
  { id: '8', imageUrl: 'https://placehold.co/380x380.png', alt: 'Country Road', dataAiHint: 'country road', sizeClasses: 'w-32 h-32 md:w-48 md:h-48', positionClasses: 'absolute bottom-[5%] left-[20%]', zIndex: 'z-10' },
  { id: '9', imageUrl: 'https://placehold.co/280x280.png', alt: 'Woman Singing', dataAiHint: 'woman singing', sizeClasses: 'w-36 h-36 md:w-44 md:h-44', positionClasses: 'absolute bottom-[8%] left-[40%]', rotationClasses: 'transform rotate-1', zIndex: 'z-20' },
  { id: '10', imageUrl: 'https://placehold.co/360x360.png', alt: 'Band Photo', dataAiHint: 'band photo', sizeClasses: 'w-32 h-32 md:w-40 md:h-40', positionClasses: 'absolute bottom-[25%] right-[28%]', zIndex: 'z-0' },
  { id: '11', imageUrl: 'https://placehold.co/420x420.png', alt: 'Purple Abstract Figure', dataAiHint: 'abstract figure', sizeClasses: 'w-36 h-36 md:w-52 md:h-52', positionClasses: 'absolute bottom-[10%] right-[10%]', rotationClasses: 'transform -rotate-2', zIndex: 'z-10' },
  { id: '12', imageUrl: 'https://placehold.co/260x260.png', alt: 'Red Geometric Pattern', dataAiHint: 'red geometric', sizeClasses: 'w-28 h-28 md:w-36 md:h-36', positionClasses: 'absolute bottom-[2%] right-[2%]', zIndex: 'z-20' },
];

export default function PhotoAlbumClient() {
  return (
    <div className="relative w-full h-[calc(100vh-12rem)]  bg-muted/30 overflow-hidden p-4 md:p-8">
      {/* Central Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-30 pointer-events-none">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-destructive tracking-tight">
          Where your new
        </h2>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-destructive tracking-tight mt-1 md:mt-2">
          favorites find you.
        </h2>
      </div>

      {/* Album Grid */}
      {albumItems.map((item) => (
        <div
          key={item.id}
          className={`
            ${item.sizeClasses} 
            ${item.positionClasses} 
            ${item.rotationClasses || ''} 
            ${item.zIndex || 'z-0'}
            shadow-lg hover:shadow-2xl transition-all duration-300 ease-out
          `}
        >
          <Image
            src={item.imageUrl}
            alt={item.alt}
            layout="fill"
            objectFit="cover"
            className="rounded-lg md:rounded-xl"
            data-ai-hint={item.dataAiHint}
            priority={parseInt(item.id) <= 3} // Prioritize loading for first few images
          />
        </div>
      ))}
    </div>
  );
}
