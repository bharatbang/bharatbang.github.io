
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Metadata } from 'next'; // Still useful for when not redirecting
import HtmlCreatorClient from '@/components/html-creator/html-creator-client';
import { Loader2 } from 'lucide-react'; // For a loading indicator

// Metadata for this page when it's not redirecting (desktop view)
// Note: Dynamic titles based on client-side state need different handling in App Router.
// This approach is for static metadata if the page *could* render.
// For a page that *always* redirects or conditionally renders based on client state,
// metadata might be better handled at a higher level or not at all if it never fully renders.

export default function HtmlCreatorPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    // Set initial state
    setIsMobile(checkMobile());

    // Optional: if you need to react to resize after initial load
    // const handleResize = () => setIsMobile(checkMobile());
    // window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile === true) {
      router.replace('/html-creator/mobile-alert');
    }
  }, [isMobile, router]);

  if (isMobile === undefined) {
    // Still determining screen size, show a loader
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Checking device...</p>
      </div>
    );
  }

  if (isMobile === true) {
    // Being redirected, can show a message or loader
    // This content will likely flash briefly before redirection occurs.
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Redirecting for mobile...</p>
      </div>
    );
  }

  // Not mobile and check is complete, render the actual HTML creator
  return <HtmlCreatorClient />;
}
