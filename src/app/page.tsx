
'use client';

import React, { useRef } from 'react';
import GenreExplorerClient from '@/components/genre-explorer-client';
import type { GuideCategory } from '@/types';
import seriesData from '@/data/series.json';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { CodeXml, Smartphone, Mail, Images, MessageSquare, ShieldBan, BookText, Calculator, Car, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';
import { markTwainQuotes } from '@/data/quotes';
import InitialQuoteToast from '@/components/initial-quote-toast';

// We can directly import the JSON data in a client component.
const initialData: GuideCategory[] = seriesData as GuideCategory[];

interface HomeProps {
  randomQuote: string | null;
}

export default function HomePage() {
  const [randomQuote, setRandomQuote] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (markTwainQuotes && markTwainQuotes.length > 0) {
      setRandomQuote(markTwainQuotes[Math.floor(Math.random() * markTwainQuotes.length)]);
    }
  }, []);

  return <HomeClient initialData={initialData} randomQuote={randomQuote} />;
}


function HomeClient({ initialData, randomQuote }: { initialData: GuideCategory[], randomQuote: string | null }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8; // Scroll 80% of the visible width
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {randomQuote && <InitialQuoteToast quote={randomQuote} />}
      <header className="py-8 animated-header-background text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h1 className="text-5xl font-bold tracking-tight text-center">Bharat Bang</h1>
          <h2 className="text-3xl font-medium tracking-tight text-primary-foreground/90 mt-2 text-center">भरत बंग</h2>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 md:p-8">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold tracking-tight mb-6 text-center sm:text-left">
            Quick Links
          </h2>
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background rounded-full shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft />
            </Button>
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2 px-1"
            >
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
              <Link href="/connect-me" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                <Mail size={20} className="mr-2" />
                Connect Me
              </Link>
              <Link href="/photo-album" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                <Images size={20} className="mr-2" />
                Photo Album
              </Link>
              <Link href="/chat-anonymous" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                <MessageSquare size={20} className="mr-2" />
                Chat Anonymous
              </Link>
              <Link href="/profanity-filtering" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                <ShieldBan size={20} className="mr-2" />
                Profanity Filtering
              </Link>
              <Link href="/stories" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                <BookText size={20} className="mr-2" />
                Stories
              </Link>
              <Link href="/emi-comparison" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                <Calculator size={20} className="mr-2" />
                EMI Comparison
              </Link>
              <Link href="/car-search" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                <Car size={20} className="mr-2" />
                Car Search
              </Link>
              <Link href="/admin-db-access" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                <ClipboardList size={20} className="mr-2" />
                Admin DB Access
              </Link>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background rounded-full shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight />
            </Button>
          </div>
        </section>

        <GenreExplorerClient initialData={initialData} />

      </main>
      <footer className="py-6 mt-12 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bharat Bang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
