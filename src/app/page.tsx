
import GenreExplorerClient from '@/components/genre-explorer-client';
import type { GuideCategory } from '@/types';
import { promises as fs } from 'fs';
import path from 'path';
import AnimatedTitle from '@/components/animated-title';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { CodeXml, Smartphone } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-8 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <AnimatedTitle text="Bharat Bang" as="h1" className="text-5xl font-bold tracking-tight text-center" typingSpeed={100} initialDelay={200} />
          <AnimatedTitle text="भरत बंग" as="h2" className="text-3xl font-medium tracking-tight text-primary-foreground/90 mt-2 text-center" typingSpeed={100} initialDelay={1400} />
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 md:p-8">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight mb-6 text-center sm:text-left">
            Code Snippets
          </h2>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4 flex-wrap">
            <Link href="/html-creator" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              <CodeXml size={20} className="mr-2" />
              HTML Creator
            </Link>
            <Link href="/html-creator-v2" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              <CodeXml size={20} className="mr-2" />
              HTML Creator V2
            </Link>
            <Link href="/phone-size-compare" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              <Smartphone size={20} className="mr-2" />
              Phone Size Compare
            </Link>
          </div>
        </section>
        <GenreExplorerClient initialData={guideData} />
      </main>
      <footer className="py-6 mt-12 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bharat Bang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

