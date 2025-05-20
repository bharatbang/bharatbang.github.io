
"use client";

import type { GuideCategory, Genre, Series } from '@/types';
import type { LucideIcon } from 'lucide-react'
import React, { useState, useMemo, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SeriesCard from '@/components/series-card';
import {
  Film, Rocket, Swords, Smile, Drama, Zap, Ghost, Heart, PencilLine, BookOpen, Search, ArrowDownUp, FilterX, Tv,
  Landmark, Utensils, Plane, ShieldAlert, ChefHat, ShoppingBasket, Flame, Coffee, Map, Lightbulb, Briefcase, ListFilter
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

const DEFAULT_CATEGORY_NAME = "";
const DEFAULT_GENRE_NAME = "";

export default function GenreExplorerClient({ initialData }: GenreExplorerClientProps) {
  const [guideCategories, setGuideCategories] = useState<GuideCategory[]>(initialData);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

  const [selectedGuideCategoryName, setSelectedGuideCategoryName] = useState<string>(() => {
    if (initialData.length === 0) {
        return DEFAULT_CATEGORY_NAME;
    }
    const mumbaiGuide = initialData.find(gc => gc.name === 'Mumbai Guide');
    if (mumbaiGuide) {
        return mumbaiGuide.name;
    } else if (initialData.length > 0) {
        return initialData[0].name;
    } else {
        return DEFAULT_CATEGORY_NAME;
    }
  });
  
  const [selectedGenreName, setSelectedGenreName] = useState<string>(DEFAULT_GENRE_NAME);

  useEffect(() => {
    setGuideCategories(initialData);

    if (initialData.length === 0) {
      setSelectedGuideCategoryName(DEFAULT_CATEGORY_NAME);
      setSelectedGenreName(DEFAULT_GENRE_NAME);
      return;
    }

    const currentGuideCat = initialData.find(gc => gc.name === selectedGuideCategoryName);

    if (currentGuideCat) {
      if (currentGuideCat.genres.length > 0) {
        const currentGenreIsValid = currentGuideCat.genres.some(g => g.name === selectedGenreName);
        if (!currentGenreIsValid || selectedGenreName === DEFAULT_GENRE_NAME) {
          setSelectedGenreName(currentGuideCat.genres[0].name);
        }
      } else {
        setSelectedGenreName(DEFAULT_GENRE_NAME);
      }
    } else {
      const newSelectedGuideCategoryName = initialData[0]?.name || DEFAULT_CATEGORY_NAME;
      setSelectedGuideCategoryName(newSelectedGuideCategoryName);
      
      const newCategory = initialData.find(gc => gc.name === newSelectedGuideCategoryName);
      if (newCategory && newCategory.genres.length > 0) {
        setSelectedGenreName(newCategory.genres[0].name);
      } else {
        setSelectedGenreName(DEFAULT_GENRE_NAME);
      }
    }
  }, [initialData, selectedGuideCategoryName, selectedGenreName]);


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
  
  const handleGuideCategoryChange = (newCategoryName: string) => {
    setSelectedGuideCategoryName(newCategoryName);
    const newCategory = guideCategories.find(gc => gc.name === newCategoryName);
    if (newCategory && newCategory.genres.length > 0) {
      setSelectedGenreName(newCategory.genres[0].name);
    } else {
      setSelectedGenreName(DEFAULT_GENRE_NAME);
    }
  };


  if (!initialData) { 
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-muted-foreground">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
       {/* Guide Category Tabs */}
      <Tabs 
        value={selectedGuideCategoryName} 
        onValueChange={handleGuideCategoryChange} 
        className="w-full"
      >
        <TabsList className="flex flex-wrap gap-2 p-2 bg-card rounded-lg shadow-md border border-input justify-start items-center h-auto">
          {guideCategories.map((category) => {
            const IconComponent = guideCategoryIconMap[category.iconName] || Tv; 
            return (
              <TabsTrigger 
                key={category.name} 
                value={category.name} 
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm rounded-md transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-accent hover:text-accent-foreground flex-wrap"
                aria-label={`Select ${category.name} category`}
              >
                <IconComponent size={20} aria-hidden="true" className="shrink-0"/>
                <span className="text-center">{category.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      {/* Genre/Sub-category Tabs */}
      {selectedGuideCategory && selectedGuideCategory.genres.length > 0 && (
        <Tabs 
          value={selectedGenreName} 
          onValueChange={setSelectedGenreName} 
          className="w-full mt-4"
        >
          
          <TabsList className="flex flex-wrap gap-2 p-2 bg-secondary rounded-lg shadow-inner justify-start items-center h-auto">
            {selectedGuideCategory.genres.map((genre) => {
              const IconComponent = genreIconMap[genre.iconName] || ListFilter; 
              return (
                <TabsTrigger 
                  key={genre.name} 
                  value={genre.name} 
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm rounded-md transition-colors data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-accent hover:text-accent-foreground flex-wrap"
                  aria-label={`Select ${genre.name} genre`}
                >
                  <IconComponent size={18} aria-hidden="true" className="shrink-0"/>
                  <span className="text-center">{genre.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          
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
                    className="pl-10 pr-4 py-2 w-full rounded-md shadow-sm focus:ring-accent focus:border-accent"
                    aria-label="Filter items"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <Button variant="outline" onClick={handleSortToggle} className="w-full sm:w-auto rounded-md shadow-sm hover:bg-accent/10">
                  <ArrowDownUp size={18} className="mr-2" aria-hidden="true" />
                  Sort A-Z ({sortOrder === 'asc' ? 'Asc' : sortOrder === 'desc' ? 'Desc' : 'Off'})
                </Button>
                <Button variant="ghost" onClick={handleClearFilters} className="w-full sm:w-auto text-muted-foreground hover:text-foreground rounded-md">
                  <FilterX size={18} className="mr-2" aria-hidden="true" />
                  Clear Filters
                </Button>
              </div>

              {filteredAndSortedSeries.length > 0 ? (
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6 mt-4">
                  {filteredAndSortedSeries.map((series) => ( 
                    <SeriesCard key={series.id} series={series} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-10 text-lg">
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
         <p className="text-center text-muted-foreground py-10 text-lg">
            No sub-categories available for {selectedGuideCategory.name}.
          </p>
      )}
       {!selectedGuideCategory && initialData.length > 0 && ( 
         <p className="text-center text-muted-foreground py-10 text-lg">
            Select a guide category to see content.
          </p>
      )}
      {initialData.length === 0 && ( 
         <p className="text-center text-muted-foreground py-10 text-lg">
            No guide data available.
          </p>
      )}
    </div>
  );
}
