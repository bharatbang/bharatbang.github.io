
'use client';

import Image from 'next/image';
import type { CarSpec } from '@/data/car-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Fuel, Users, Zap, Gauge } from 'lucide-react'; // Gauge for mileage, Zap for Electric

interface CarCardProps {
  car: CarSpec;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <div className="aspect-[16/10] w-full relative">
          <Image
            src={car.imageUrl}
            alt={car.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={car.dataAiHint || `${car.brand} ${car.bodyType}`}
          />
        </div>
        {car.safetyRating && (
          <Badge variant="default" className="absolute top-2 right-2 bg-green-600 text-white">
            {car.safetyRating} Star Safety
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 line-clamp-1">{car.name}</CardTitle>
        <p className="text-primary text-md font-bold mb-2">{car.priceDisplay}</p>
        <div className="text-xs text-muted-foreground space-y-1.5">
          {car.mileage && (
            <div className="flex items-center gap-1.5">
              {car.fuelType === 'Electric' ? <Zap size={12} /> : <Gauge size={12} />}
              <span>{car.mileage}</span>
            </div>
          )}
          {car.engine && (
             <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="m12 14-4-4"/><path d="m12 14 4-4"/></svg>
                <span>{car.engine}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Fuel size={12} />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={12} /> 
            <span>{car.bodyType}</span> {/* Using bodyType here as seating capacity might not always be there */}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 border-t">
        <Button variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          Get Best Offer
        </Button>
        {/* <Button variant="outline" className="w-1/2">View Details</Button> */}
      </CardFooter>
    </Card>
  );
}
