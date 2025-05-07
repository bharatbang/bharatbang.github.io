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
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          data-ai-hint={series.dataAiHint || "movie poster"}
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <CardTitle className="text-lg font-semibold leading-tight mb-1">{series.title}</CardTitle>
        {/* Placeholder for description or other info if needed in future */}
        {/* <CardDescription className="text-sm text-muted-foreground">Description placeholder</CardDescription> */}
      </CardContent>
    </Card>
  );
}
