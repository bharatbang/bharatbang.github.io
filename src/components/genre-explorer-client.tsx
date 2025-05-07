"use client";

import type { GuideCategory, Genre, Series } from '@/types';
import type { LucideIcon } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SeriesCard from '@/components/series-card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Film, Rocket, Swords, Smile, Drama, Zap, Ghost, Heart, PencilLine, BookOpen, Search, ArrowDownUp, FilterX, Tv,
  Landmark, Utensils, Plane, ShieldAlert, ChefHat, ShoppingBasket, Flame, Coffee, Map, Lightbulb, Briefcase
} from 'lucide-react';

const guideCategoryIconMap: { [key: string]: LucideIcon } = {
  Landmark: Landmark,
  Utensils: Utensils,
  Plane: Plane,
  Tv: Tv,
  Film: Film,
};

const genreIconMap: { [key: string]: LucideIcon } = {
  Rocket: Rocket,
  Swords: Swords,
  Smile: Smile,
  Drama: Drama,
  Zap: Zap,
  Ghost: Ghost,
  Heart: Heart,
  PencilLine: PencilLine,
  BookOpen: BookOpen,
  Film: Film,
  Tv: Tv,
  ShieldAlert: ShieldAlert, // Thriller
  Landmark: Landmark, // Mumbai Landmarks
  ChefHat: ChefHat, // Mumbai Food, Food Restaurants
  ShoppingBasket: ShoppingBasket, // Mumbai Markets
  Utensils: Utensils, // Food Restaurants (can be same as guide)
  Flame: Flame, // Food Street Food
  Coffee: Coffee, // Food Cafes
  Map: Map, // Travel Destinations
  Lightbulb: Lightbulb, // Travel Tips
  Briefcase: Briefcase, // Travel Packing
};

interface GenreExplorerClientProps {
  initialData: GuideCategory[];
}

export default function GenreExplorerClient({ initialData }: GenreExplorerClientProps) {
  const [guideCategories, setGuideCategories] = useState<GuideCategory[]>(initialData);
  const [selectedGuideCategoryName, setSelectedGuideCategoryName] = useState<string>(initialData[0]?.name || '');
  const [selectedGenreName, setSelectedGenreName] = useState<string>('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');

  useEffect(() => {
    setGuideCategories(initialData);
    if (initialData.length > 0) {
      const currentGuideCat = initialData.find(gc => gc.name === selectedGuideCategoryName);
      if (!currentGuideCat) {
        setSelectedGuideCategoryName(initialData[0].name);
        setSelectedGenreName(initialData[0].genres[0]?.name || '');
      } else {
        // If current guide category is valid, ensure genre is also valid or set to first
        const currentGenre = currentGuideCat.genres.find(g => g.name === selectedGenreName);
        if (!currentGenre && currentGuideCat.genres.length > 0) {
          setSelectedGenreName(currentGuideCat.genres[0].name);
        } else if (currentGuideCat.genres.length === 0) {
          setSelectedGenreName('');
        }
      }
    } else {
        setSelectedGuideCategoryName('');
        setSelectedGenreName('');
    }
  }, [initialData, selectedGuideCategoryName, selectedGenreName]);

  // Update selected genre when guide category changes
  useEffect(() => {
    const currentGuideCat = guideCategories.find(gc => gc.name === selectedGuideCategoryName);
    if (currentGuideCat && currentGuideCat.genres.length > 0) {
      // Check if current selectedGenreName is valid for the new guide category
      const genreExistsInNewCategory = currentGuideCat.genres.some(g => g.name === selectedGenreName);
      if (!genreExistsInNewCategory) {
        setSelectedGenreName(currentGuideCat.genres[0].name);
      }
    } else if (currentGuideCat && currentGuideCat.genres.length === 0) {
      setSelectedGenreName('');
    }
  }, [selectedGuideCategoryName, guideCategories, selectedGenreName]);


  const selectedGuideCategory = useMemo(() => {
    return guideCategories.find(gc => gc.name === selectedGuideCategoryName);
  }, [guideCategories, selectedGuideCategoryName]);

  const selectedGenre = useMemo(() => {
    if (!selectedGuideCategory) return undefined;
    return selectedGuideCategory.genres.find(g => g.name === selectedGenreName);
  }, [selectedGuideCategory, selectedGenreName]);

  const filteredAndSortedSeries = useMemo((): Series[] => {
    if (!selectedGenre || !selectedGenre.series) return [];

    let seriesToList = selectedGenre.series;

    if (searchTerm) {
      seriesToList = seriesToList.filter(series =>
        series.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (series.description && series.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (sortOrder !== 'none') {
      seriesToList = [...seriesToList].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
    }
    return seriesToList;
  }, [selectedGenre, searchTerm, sortOrder]);

  const handleSortToggle = () => {
    if (sortOrder === 'none') setSortOrder('asc');
    else if (sortOrder === 'asc') setSortOrder('desc');
    else setSortOrder('none');
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSortOrder('none');
  };
  
  if (!initialData || initialData.length === 0) {
    return <p className="text-center text-muted-foreground">No data available.</p>;
  }

  return (
    <div className="space-y-8">
      {/* Guide Category Tabs */}
      <Tabs value={selectedGuideCategoryName} onValueChange={setSelectedGuideCategoryName} className="w-full">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <TabsList className="inline-flex h-auto p-2 space-x-2 bg-card rounded-md">
            {guideCategories.map((category) => {
              const IconComponent = guideCategoryIconMap[category.iconName] || Tv;
              return (
                <TabsTrigger key={category.name} value={category.name} className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <IconComponent size={18} />
                  <span>{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>

      {/* Genre/Sub-category Tabs */}
      {selectedGuideCategory && selectedGuideCategory.genres.length > 0 && (
        <Tabs value={selectedGenreName} onValueChange={setSelectedGenreName} className="w-full mt-4">
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <TabsList className="inline-flex h-auto p-2 space-x-2 bg-secondary rounded-md">
              {selectedGuideCategory.genres.map((genre) => {
                const IconComponent = genreIconMap[genre.iconName] || ListFilter;
                return (
                  <TabsTrigger key={genre.name} value={genre.name} className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <IconComponent size={18} />
                    <span>{genre.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Content for selected genre */}
          {selectedGuideCategory.genres.map((genre) => (
            <TabsContent key={genre.name} value={genre.name} className="mt-6">
              <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full sm:max-w-xs">
                  <Input
                    type="text"
                    placeholder="Filter by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <Button variant="outline" onClick={handleSortToggle} className="w-full sm:w-auto">
                  <ArrowDownUp size={18} className="mr-2" />
                  Sort A-Z ({sortOrder === 'asc' ? 'Asc' : sortOrder === 'desc' ? 'Desc' : 'Off'})
                </Button>
                <Button variant="ghost" onClick={handleClearFilters} className="w-full sm:w-auto text-muted-foreground hover:text-foreground">
                  <FilterX size={18} className="mr-2" />
                  Clear
                </Button>
              </div>

              {filteredAndSortedSeries.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {filteredAndSortedSeries.map((series) => (
                    <SeriesCard key={series.id} series={series} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-10">
                  No items found for "{genre.name}"
                  {searchTerm && ` matching "${searchTerm}"`}
                  {selectedGuideCategory && ` in ${selectedGuideCategory.name}`}.
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
      {selectedGuideCategory && selectedGuideCategory.genres.length === 0 && (
         <p className="text-center text-muted-foreground py-10">
            No sub-categories available for {selectedGuideCategory.name}.
          </p>
      )}
       {!selectedGuideCategory && (
         <p className="text-center text-muted-foreground py-10">
            Select a guide category to see content.
          </p>
      )}
    </div>
  );
}
