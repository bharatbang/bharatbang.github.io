
'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface InitialQuoteToastProps {
  quote: string | null;
}

export default function InitialQuoteToast({ quote }: InitialQuoteToastProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (quote) {
      toast({
        title: "Quote of the Moment",
        description: `"${quote}" - Mark Twain`,
        duration: 8000, // Stays for 8 seconds
      });
    }
  }, [quote, toast]); // Effect dependencies

  return null; // This component does not render anything itself
}
