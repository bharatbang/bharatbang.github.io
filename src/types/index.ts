import type { LucideIcon } from 'lucide-react';

export interface Series {
  id: string;
  title: string;
  imageUrl: string;
  dataAiHint?: string;
}

export interface Genre {
  name: string;
  iconName: string; // Store the name of the Lucide icon
  series: Series[];
}
