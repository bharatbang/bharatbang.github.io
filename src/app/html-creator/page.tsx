
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Metadata } from 'next'; 
import HtmlCreatorClient from '@/components/html-creator/html-creator-client';
import { Loader2, ArrowLeft } from 'lucide-react'; 
import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function HtmlCreatorPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());
  }, []);

  useEffect(() => {
    if (isMobile === true) {
      router.replace('/html-creator/mobile-alert');
    }
  }, [isMobile, router]);

  if (isMobile === undefined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Checking device...</p>
      </div>
    );
  }

  if (isMobile === true) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Redirecting for mobile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="py-6 animated-header-background text-primary-foreground shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight">HTML Creator</h1>
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
        <HtmlCreatorClient />
      </main>
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bharat Bang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
