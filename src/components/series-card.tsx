import type { Series } from "@/types";
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

interface SeriesCardProps {
  series: Series;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  const cardContent = (
    <div className="flex flex-col items-center border border-border rounded-lg hover:border-primary transition-colors w-full h-full">
      <div className="relative w-full aspect-[3/2] overflow-hidden">
        {isLoading && (
          <Skeleton className="absolute inset-0" />
        )}
        <Image
          src={series.imageUrl}
          alt={series.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16vw, 12.5vw"
          style={{ objectFit: 'cover' }}
          className={`object-cover transition-opacity duration-500 rounded-t-lg ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          data-ai-hint={series.dataAiHint || "item image"}
          priority={false} // Consider setting priority dynamically for above-the-fold images
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <div className="text-center mt-2 leading-tight overflow-hidden p-2 flex-grow flex flex-col justify-center">
        <p className="line-clamp-2 text-sm">{series.title}</p>
      </div>
    </div>
  );

  if (series.imdbUrl) {
    return (
      <Link href={series.imdbUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
