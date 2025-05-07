import type { Series } from "@/types";
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

interface SeriesCardProps {
  series: Series;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col items-center border border-border rounded-lg hover:border-primary transition-colors w-full">
      <div className="relative w-full aspect-[3/2] overflow-hidden">
        {isLoading && (
          <Skeleton className="absolute inset-0" />
        )}
        <Image
          src={series.imageUrl}
          alt={series.title}
          fill
          sizes="100vw" // Adjust as needed
          style={{ objectFit: 'cover' }}
          className={`object-cover transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          data-ai-hint={series.dataAiHint || "item image"}
          priority={false}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <div className="text-center mt-2 leading-tight overflow-hidden p-2">
        <p className="line-clamp-2">{series.title}</p>
      </div>
    </div>
  );
}
