
import type { Metadata } from 'next';
import HtmlCreatorClientV2 from '@/components/html-creator-v2/html-creator-client-v2';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HTML Creator V2 - Bharat Bang',
  description: 'Visually create and customize HTML forms and structures (Version 2).',
};

export default function HtmlCreatorV2Page() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="py-6 animated-header-background text-primary-foreground shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight">HTML Creator V2</h1>
            <Link href="/" legacyBehavior>
              <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col overflow-hidden">
        <HtmlCreatorClientV2 />
      </main>
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bharat Bang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
