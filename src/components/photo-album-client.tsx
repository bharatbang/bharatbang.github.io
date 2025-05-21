
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

// These are placeholder images. You should replace 'imageUrl' with direct links
// to images (e.g., from Wikimedia Commons), ensuring you have the right to use them
// and that their hostnames are added to next.config.ts.
const albumItems: AlbumItem[] = [
  {
    id: 'mumbai-1',
    imageUrl: 'https://placehold.co/400x300.png',
    alt: 'Gateway of India, Mumbai',
    dataAiHint: 'Gateway India',
    sizeClasses: 'w-40 h-32 md:w-56 md:h-44',
    positionClasses: 'absolute top-[5%] left-[5%]',
    rotationClasses: 'transform -rotate-3',
    zIndex: 'z-10',
  },
  {
    id: 'mumbai-2',
    imageUrl: 'https://placehold.co/350x250.png',
    alt: 'Marine Drive, Mumbai',
    dataAiHint: 'Marine Drive',
    sizeClasses: 'w-36 h-28 md:w-48 md:h-36',
    positionClasses: 'absolute top-[10%] right-[8%]',
    rotationClasses: 'transform rotate-2',
    zIndex: 'z-5',
  },
  {
    id: 'mumbai-3',
    imageUrl: 'https://placehold.co/450x350.png',
    alt: 'Chhatrapati Shivaji Maharaj Terminus (CSMT), Mumbai',
    dataAiHint: 'CSMT station',
    sizeClasses: 'w-44 h-36 md:w-60 md:h-48',
    positionClasses: 'absolute top-[25%] left-[15%]',
    rotationClasses: 'transform rotate-1',
    zIndex: 'z-20',
  },
  {
    id: 'mumbai-4',
    imageUrl: 'https://placehold.co/300x400.png',
    alt: 'Haji Ali Dargah, Mumbai',
    dataAiHint: 'Haji Ali',
    sizeClasses: 'w-32 h-40 md:w-40 md:h-52',
    positionClasses: 'absolute top-[30%] right-[20%]',
    rotationClasses: 'transform -rotate-2',
    zIndex: 'z-10',
  },
  {
    id: 'mumbai-5',
    imageUrl: 'https://placehold.co/380x280.png',
    alt: 'Siddhivinayak Temple, Mumbai',
    dataAiHint: 'Siddhivinayak Temple',
    sizeClasses: 'w-36 h-28 md:w-52 md:h-40',
    positionClasses: 'absolute top-[50%] left-[5%]',
    rotationClasses: 'transform rotate-3',
    zIndex: 'z-5',
  },
  {
    id: 'mumbai-6',
    imageUrl: 'https://placehold.co/400x350.png',
    alt: 'Elephanta Caves, Mumbai',
    dataAiHint: 'Elephanta Caves',
    sizeClasses: 'w-40 h-32 md:w-56 md:h-48',
    positionClasses: 'absolute top-[55%] right-[5%]',
    rotationClasses: 'transform -rotate-1',
    zIndex: 'z-15',
  },
  {
    id: 'mumbai-7',
    imageUrl: 'https://placehold.co/360x260.png',
    alt: 'Juhu Beach, Mumbai',
    dataAiHint: 'Juhu Beach',
    sizeClasses: 'w-36 h-28 md:w-48 md:h-36',
    positionClasses: 'absolute bottom-[20%] left-[25%]',
    rotationClasses: 'transform rotate-2',
    zIndex: 'z-10',
  },
  {
    id: 'mumbai-8',
    imageUrl: 'https://placehold.co/420x320.png',
    alt: 'Film City (Dadasaheb Phalke Chitranagari), Mumbai',
    dataAiHint: 'Film City',
    sizeClasses: 'w-40 h-32 md:w-56 md:h-44',
    positionClasses: 'absolute bottom-[22%] right-[15%]',
    rotationClasses: 'transform -rotate-3',
    zIndex: 'z-5',
  },
  {
    id: 'mumbai-9',
    imageUrl: 'https://placehold.co/500x300.png',
    alt: 'Bandra-Worli Sea Link, Mumbai',
    dataAiHint: 'Sea Link',
    sizeClasses: 'w-48 h-28 md:w-64 md:h-40',
    positionClasses: 'absolute bottom-[5%] left-[5%]',
    rotationClasses: 'transform rotate-1',
    zIndex: 'z-20',
  },
  {
    id: 'mumbai-10',
    imageUrl: 'https://placehold.co/380x420.png',
    alt: 'Sanjay Gandhi National Park, Mumbai',
    dataAiHint: 'National Park',
    sizeClasses: 'w-36 h-40 md:w-44 md:h-52',
    positionClasses: 'absolute bottom-[8%] right-[2%]',
    rotationClasses: 'transform rotate-2',
    zIndex: 'z-10',
  },
];

export default function PhotoAlbumClient() {
  return (
    <div className="relative w-full h-[calc(100vh-12rem)] bg-muted/30 overflow-hidden p-4 md:p-8">
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
            bg-background border border-border rounded-lg md:rounded-xl
          `}
        >
          <Image
            src={item.imageUrl}
            alt={item.alt}
            layout="fill"
            objectFit="cover"
            className="rounded-lg md:rounded-xl" // Ensure image itself is rounded if parent has overflow-hidden
            data-ai-hint={item.dataAiHint}
            priority={false} // Set to true for above-the-fold images if necessary
          />
        </div>
      ))}
    </div>
  );
}
