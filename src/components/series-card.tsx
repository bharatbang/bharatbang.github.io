import type { Series } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface SeriesCardProps {
  series: Series;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  return (
    <Card className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative aspect-[2/3] w-full">
        <Image
          src={series.imageUrl}
          alt={series.title}
          fill // Changed from layout="fill" objectFit="cover" for Next 13+
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes, adjust as needed
          style={{ objectFit: 'cover' }} // Used with fill
          className="rounded-t-lg"
          data-ai-hint={series.dataAiHint || "item image"}
          priority={false} // Set to true for LCP images
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <CardTitle className="text-lg font-semibold leading-tight mb-1">{series.title}</CardTitle>
          {series.description && (
            <CardDescription className="text-sm text-muted-foreground mt-1 line-clamp-3">
              {series.description}
            </CardDescription>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
