
'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BODY_TYPES, FUEL_TYPES, BUDGET_RANGES, type BodyType, type FuelType, type BudgetRange } from '@/data/car-data';
import type { Filters } from './car-search-client';

interface CarFilterSidebarProps {
  currentFilters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
  onResetFilters: () => void;
  carCount: number;
}

export default function CarFilterSidebar({ currentFilters, onFilterChange, onResetFilters, carCount }: CarFilterSidebarProps) {
  
  const handleBudgetChange = (value: string) => {
    const selectedRange = BUDGET_RANGES.find(range => range.label === value) || null;
    onFilterChange({ budget: selectedRange as BudgetRange | null });
  };

  const handleBodyTypeChange = (bodyType: BodyType, checked: boolean) => {
    const newBodyTypes = checked
      ? [...currentFilters.bodyTypes, bodyType]
      : currentFilters.bodyTypes.filter(bt => bt !== bodyType);
    onFilterChange({ bodyTypes: newBodyTypes });
  };

  const handleFuelTypeChange = (fuelType: FuelType, checked: boolean) => {
    const newFuelTypes = checked
      ? [...currentFilters.fuelTypes, fuelType]
      : currentFilters.fuelTypes.filter(ft => ft !== fuelType);
    onFilterChange({ fuelTypes: newFuelTypes });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="link" onClick={onResetFilters} className="p-0 h-auto text-sm">
            Reset All
          </Button>
        </div>
        <CardDescription className="text-xs pt-1">
          {carCount} cars found
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Accordion type="multiple" defaultValue={['budget', 'bodyType', 'fuelType']} className="w-full">
          {/* Budget Filter */}
          <AccordionItem value="budget" className="border-b">
            <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">Budget</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <RadioGroup
                value={currentFilters.budget?.label || ""}
                onValueChange={handleBudgetChange}
                className="space-y-2"
              >
                {BUDGET_RANGES.map(range => (
                  <div key={range.label} className="flex items-center space-x-2">
                    <RadioGroupItem value={range.label} id={`budget-${range.label.replace(/\s+/g, '-')}`} />
                    <Label htmlFor={`budget-${range.label.replace(/\s+/g, '-')}`} className="font-normal text-xs">{range.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>

          {/* Body Type Filter */}
          <AccordionItem value="bodyType" className="border-b">
            <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">Body Type</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1"> {/* Scroll for many options */}
                {BODY_TYPES.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`body-${type}`}
                      checked={currentFilters.bodyTypes.includes(type)}
                      onCheckedChange={(checked) => handleBodyTypeChange(type, Boolean(checked))}
                    />
                    <Label htmlFor={`body-${type}`} className="font-normal text-xs">{type}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Fuel Type Filter */}
          <AccordionItem value="fuelType" className="border-b-0">
            <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">Fuel Type</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-2">
                {FUEL_TYPES.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`fuel-${type}`}
                      checked={currentFilters.fuelTypes.includes(type)}
                      onCheckedChange={(checked) => handleFuelTypeChange(type, Boolean(checked))}
                    />
                    <Label htmlFor={`fuel-${type}`} className="font-normal text-xs">{type}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Future: Add more filter sections like Transmission, Seating Capacity, etc. */}
        </Accordion>
      </CardContent>
    </Card>
  );
}
