import GenreExplorerClient from '@/components/genre-explorer-client';
import type { GuideCategory } from '@/types';
import { promises as fs } from 'fs';
import path from 'path';
import AnimatedTitle from '@/components/animated-title';

async function getSeriesData(): Promise<GuideCategory[]> {
  try {
    // Correct path for Vercel deployment and local dev
    const filePath = path.join(process.cwd(), 'src', 'data', 'series.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    // Validate that jsonData is an array of GuideCategory objects
    if (
      Array.isArray(jsonData) &&
      jsonData.every(
        (cat) =>
          typeof cat.name === 'string' &&
          typeof cat.iconName === 'string' &&
          Array.isArray(cat.genres) &&
          cat.genres.every(
            (genre: any) =>
              typeof genre.name === 'string' &&
              typeof genre.iconName === 'string' &&
              Array.isArray(genre.series)
          )
      )
    ) {
      return jsonData as GuideCategory[];
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
  const guideData = await getSeriesData();
  const pageTitle = "Bharat Bang";
  const pageTitleHindi = "भरत बंग";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-8 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4">
          <AnimatedTitle 
            text={pageTitle} 
            className="text-4xl font-bold tracking-tight text-center" 
            animationSpeed={250} // Slower speed for more noticeable effect
          />
          <AnimatedTitle 
            text={pageTitleHindi} 
            className="text-3xl font-bold tracking-tight text-center mt-2" 
            animationSpeed={250} 
          />
          <p className="text-center text-lg text-primary-foreground/80 mt-4">Discover guides, series, movies and more</p>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 md:p-8">
        <GenreExplorerClient initialData={guideData} />
      </main>
      <footer className="py-6 mt-12 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Universal Explorer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

