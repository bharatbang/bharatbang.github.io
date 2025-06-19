
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  CARS_DATA, 
  type CarSpec, 
  type BudgetRange,
  type PowerRange,
  type BootVolumeRange
} from '@/data/car-data';
import CarFilterSidebar from './car-filter-sidebar';
import CarCard from './car-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '../ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';


export interface Filters {
  budget: BudgetRange | null;
  bodyTypes: string[];
  fuelTypes: string[];
  powerRange: PowerRange | null;
  bootVolumeRange: BootVolumeRange | null;
  features: {
    hasTractionControl: boolean;
    hasAllPowerWindows: boolean;
    hasMultipleAirbags: boolean; // True if airbagCount >= 2
    hasMusicSystem: boolean;
    hasAlloyWheels: boolean;
  };
}

const initialFilters: Filters = {
  budget: null,
  bodyTypes: [],
  fuelTypes: [],
  powerRange: null,
  bootVolumeRange: null,
  features: {
    hasTractionControl: false,
    hasAllPowerWindows: false,
    hasMultipleAirbags: false,
    hasMusicSystem: false,
    hasAlloyWheels: false,
  },
};

export default function CarSearchClient() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [filteredCars, setFilteredCars] = useState<CarSpec[]>(CARS_DATA);
  const [sortOption, setSortOption] = useState<string>('relevance');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    let newFilteredCars = [...CARS_DATA];

    // Budget filter
    if (filters.budget) {
      newFilteredCars = newFilteredCars.filter(car => 
        car.price >= filters.budget!.min && car.price <= filters.budget!.max
      );
    }

    // Body type filter
    if (filters.bodyTypes.length > 0) {
      newFilteredCars = newFilteredCars.filter(car => filters.bodyTypes.includes(car.bodyType));
    }

    // Fuel type filter
    if (filters.fuelTypes.length > 0) {
      newFilteredCars = newFilteredCars.filter(car => filters.fuelTypes.includes(car.fuelType));
    }

    // Power range filter
    if (filters.powerRange && filters.powerRange.min !== undefined && filters.powerRange.max !== undefined) {
      newFilteredCars = newFilteredCars.filter(car => 
        car.maxPowerHp && car.maxPowerHp >= filters.powerRange!.min && car.maxPowerHp <= filters.powerRange!.max
      );
    }

    // Boot volume range filter
    if (filters.bootVolumeRange && filters.bootVolumeRange.min !== undefined && filters.bootVolumeRange.max !== undefined) {
      newFilteredCars = newFilteredCars.filter(car => 
        car.bootVolumeLitres && car.bootVolumeLitres >= filters.bootVolumeRange!.min && car.bootVolumeLitres <= filters.bootVolumeRange!.max
      );
    }
    
    // Features filters
    if (filters.features.hasTractionControl) {
      newFilteredCars = newFilteredCars.filter(car => car.hasTractionControl === true);
    }
    if (filters.features.hasAllPowerWindows) {
      newFilteredCars = newFilteredCars.filter(car => car.hasAllPowerWindows === true);
    }
    if (filters.features.hasMultipleAirbags) {
      newFilteredCars = newFilteredCars.filter(car => car.airbagCount && car.airbagCount >= 2);
    }
    if (filters.features.hasMusicSystem) {
      newFilteredCars = newFilteredCars.filter(car => car.hasMusicSystem === true);
    }
    if (filters.features.hasAlloyWheels) {
      newFilteredCars = newFilteredCars.filter(car => car.hasAlloyWheels === true);
    }
    
    // Sorting
    switch (sortOption) {
      case 'price_asc':
        newFilteredCars.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        newFilteredCars.sort((a, b) => b.price - a.price);
        break;
      case 'relevance': 
      default:
        break;
    }

    setFilteredCars(newFilteredCars);
  }, [filters, sortOption]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ 
      ...prev, 
      ...newFilters,
      features: { // Ensure features is properly merged
        ...prev.features,
        ...(newFilters.features || {}),
      }
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const sidebarContent = (
    <CarFilterSidebar
      currentFilters={filters}
      onFilterChange={handleFilterChange}
      onResetFilters={handleResetFilters}
      carCount={filteredCars.length}
    />
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-full lg:w-1/4 xl:w-1/5 sticky top-[calc(theme(spacing.20)_+_6rem)] h-[calc(100vh_-_theme(spacing.20)_-_8rem)]">
         <ScrollArea className="h-full pr-4 rounded-md">
          {sidebarContent}
        </ScrollArea>
      </aside>

      {/* Mobile Filter Button & Sheet */}
      <div className="lg:hidden mb-4">
        <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-center">
              <SlidersHorizontal size={18} className="mr-2" />
              Show Filters ({filteredCars.length} cars)
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-full max-w-sm">
            <ScrollArea className="h-full p-4">
              {sidebarContent}
              <Button onClick={() => setIsMobileFiltersOpen(false)} className="w-full mt-4">
                View {filteredCars.length} Cars
              </Button>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
          <h2 className="text-xl font-semibold">
            {filteredCars.length} New Cars Found
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort By:</span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-auto sm:w-[180px]">
                <SelectValue placeholder="Relevance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="popular">Popularity</SelectItem>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No cars match your current filters.</p>
            <Button variant="link" onClick={handleResetFilters} className="mt-2">
              Try resetting filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

    