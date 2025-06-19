
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CARS_DATA, BODY_TYPES, FUEL_TYPES, BUDGET_RANGES, type CarSpec, type BudgetRange } from '@/data/car-data';
import CarFilterSidebar from './car-filter-sidebar';
import CarCard from './car-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '../ui/button';
import { ListFilter, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';


export interface Filters {
  budget: BudgetRange | null;
  bodyTypes: string[];
  fuelTypes: string[];
}

const initialFilters: Filters = {
  budget: null,
  bodyTypes: [],
  fuelTypes: [],
};

export default function CarSearchClient() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [filteredCars, setFilteredCars] = useState<CarSpec[]>(CARS_DATA);
  const [sortOption, setSortOption] = useState<string>('relevance'); // Default: relevance, popular, latest, price_asc, price_desc
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
    
    // Sorting
    switch (sortOption) {
      case 'price_asc':
        newFilteredCars.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        newFilteredCars.sort((a, b) => b.price - a.price);
        break;
      // Add more sort cases like 'latest', 'popular' if data supports it
      case 'relevance': // Default or if data for relevance is available
      default:
        // No specific sort or use a default relevance score if available
        break;
    }


    setFilteredCars(newFilteredCars);
  }, [filters, sortOption]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
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
            {/* Future: View Toggle (Grid/List) */}
            {/* <Button variant="outline" size="icon"><LayoutGrid size={18}/></Button> */}
            {/* <Button variant="outline" size="icon"><ListFilter size={18}/></Button> */}
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
        {/* Future: Pagination */}
      </div>
    </div>
  );
}
