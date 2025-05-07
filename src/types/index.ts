import type { LucideIcon } from 'lucide-react';

export interface Series {
  id: string;
  title: string;
  imageUrl: string;
  dataAiHint?: string;
  description?: string; // Optional description for items like landmarks, food, travel tips
}

export interface Genre { // Represents a sub-category within a GuideCategory
  name: string;
  iconName: string; // Store the name of the Lucide icon for the genre/sub-category
  series: Series[];
}

export interface GuideCategory {
  name: string;
  iconName: string; // Store the name of the Lucide icon for the guide category
  genres: Genre[];
}
