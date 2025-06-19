
'use client';

import Image from 'next/image';
import type { CarSpec } from '@/data/car-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Fuel, Users, Zap, Gauge, Wind, BaggageClaim, ShieldCheck, Power, Disc3, Star } from 'lucide-react'; // Added icons

interface CarCardProps {
  car: CarSpec;
}

export default function CarCard({ car }: CarCardProps) {
  const EngineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="m12 14-4-4"/><path d="m12 14 4-4"/></svg>
  );

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
        {car.safetyRating && car.safetyRating > 0 && (
          <Badge variant="default" className="absolute top-2 right-2 bg-green-600 text-white flex items-center gap-1">
            <Star size={12} fill="white" /> 
            {car.safetyRating} Star Safety
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 line-clamp-1">{car.name}</CardTitle>
        <p className="text-primary text-md font-bold mb-2">{car.priceDisplay}</p>
        <div className="text-xs text-muted-foreground space-y-1.5">
          {car.mileageDisplay && (
            <div className="flex items-center gap-1.5">
              {car.fuelType === 'Electric' ? <Zap size={12} /> : <Gauge size={12} />}
              <span>{car.mileageDisplay}</span>
            </div>
          )}
          {car.engineDisplay && (
             <div className="flex items-center gap-1.5">
                <EngineIcon />
                <span>{car.engineDisplay}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Fuel size={12} />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={12} /> 
            <span>{car.bodyType}</span>
          </div>
           {car.maxPowerHp && (
            <div className="flex items-center gap-1.5">
              <Wind size={12} />
              <span>{car.maxPowerHp} hp</span>
            </div>
          )}
          {car.bootVolumeLitres && (
            <div className="flex items-center gap-1.5">
              <BaggageClaim size={12} />
              <span>{car.bootVolumeLitres} L Boot</span>
            </div>
          )}
           {car.hasTractionControl && (
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={12} />
              <span>Traction Control</span>
            </div>
          )}
          {car.airbagCount && car.airbagCount > 0 && (
            <div className="flex items-center gap-1.5">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12V2a10 10 0 0 0 0 20Z"/></svg>
              <span>{car.airbagCount} Airbags</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 border-t">
        <Button variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          Get Best Offer
        </Button>
      </CardFooter>
    </Card>
  );
}

    