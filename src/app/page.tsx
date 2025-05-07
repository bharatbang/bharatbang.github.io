import GenreExplorerClient from '@/components/genre-explorer-client';
import type { Genre } from '@/types';
import { promises as fs } from 'fs';
import path from 'path';

async function getSeriesData(): Promise<Genre[]> {
  try {
    // Correct path for Vercel deployment and local dev
    const filePath = path.join(process.cwd(), 'src', 'data', 'series.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    // Validate that jsonData is an array of Genre objects
    if (Array.isArray(jsonData) && jsonData.every(item => typeof item.name === 'string' && typeof item.iconName === 'string' && Array.isArray(item.series))) {
      return jsonData as Genre[];
    } else {
      console.error("Invalid data structure in series.json");
      return [];
    }
  } catch (error) {
    console.error("Failed to load series data:", error);
    return []; // Return empty array on error to prevent build failure
  }
}

export default async function Home() {
  const seriesData = await getSeriesData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-8 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight text-center">
            Genre Explorer
          </h1>
          <p className="text-center text-lg text-primary-foreground/80 mt-2">Discover your next favorite series</p>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 md:p-8">
        <GenreExplorerClient initialData={seriesData} />
      </main>
      <footer className="py-6 mt-12 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Genre Explorer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
