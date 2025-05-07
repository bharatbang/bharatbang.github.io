"use client";

import type { Genre, Series } from '@/types';
import type { LucideIcon } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SeriesCard from '@/components/series-card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Film, Rocket, Swords, Smile, Drama as DramaIconLucide, Zap, Ghost, Heart, PencilLine, BookOpen, Search, ArrowDownUp, FilterX, ListFilter, Tv
} from 'lucide-react'; // Added ListFilter, Tv for better icon choices


const iconMap: { [key: string]: LucideIcon } = {
  'Rocket': Rocket,
  'Swords': Swords,
  'Smile': Smile,
  'DramaIcon': DramaIconLucide, // Renamed to avoid conflict
  'Zap': Zap,
  'Ghost': Ghost,
  'Heart': Heart,
  'PencilLine': PencilLine,
  'BookOpen': BookOpen,
  'Film': Film, // Default/generic
  'ListFilter': ListFilter,
  'Tv': Tv,
};

interface GenreExplorerClientProps {
  initialData: Genre[];
}

export default function GenreExplorerClient({ initialData }: GenreExplorerClientProps) {
  const [genres, setGenres] = useState<Genre[]>(initialData);
  const [selectedGenreName, setSelectedGenreName] = useState<string>(initialData[0]?.name || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none'); // 'none' for original order

  useEffect(() => {
    // If initialData changes, update component state
    setGenres(initialData);
    if (initialData.length > 0 && !initialData.find(g => g.name === selectedGenreName)) {
      setSelectedGenreName(initialData[0].name);
    }
  }, [initialData, selectedGenreName]);
  
  const selectedGenre = useMemo(() => {
    return genres.find(g => g.name === selectedGenreName);
  }, [genres, selectedGenreName]);

  const filteredAndSortedSeries = useMemo(():(Series[] | undefined) => {
    if (!selectedGenre) return [];

    let seriesToList = selectedGenre.series;

    if (searchTerm) {
      seriesToList = seriesToList.filter(series =>
        series.title.toLowerCase().includes(searchTerm.toLowerCase())
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
    return <p className="text-center text-muted-foreground">No genre data available.</p>;
  }

  return (
    <div className="space-y-8">
      <Tabs value={selectedGenreName} onValueChange={setSelectedGenreName} className="w-full">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <TabsList className="inline-flex h-auto p-2 space-x-2 bg-secondary rounded-md">
            {genres.map((genre) => {
              const IconComponent = iconMap[genre.iconName] || Tv; // Default to Tv icon
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

        {genres.map((genre) => (
          <TabsContent key={genre.name} value={genre.name} className="mt-6">
            <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative w-full sm:max-w-xs">
                <Input
                  type="text"
                  placeholder="Filter series by title..."
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

            {filteredAndSortedSeries && filteredAndSortedSeries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {filteredAndSortedSeries.map((series) => (
                  <SeriesCard key={series.id} series={series} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-10">
                No series found for "{genre.name}"{searchTerm && ` matching "${searchTerm}"`}.
              </p>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
