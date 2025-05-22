
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mobile Alert - HTML Creator',
  description: 'HTML Creator is not fully functional on mobile devices.',
};

export default function MobileAlertPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 text-center">
      <div className="max-w-md p-8 bg-card shadow-xl rounded-lg border border-border">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-6 lucide lucide-smartphone-off">
          <path d="M12.3 5H17a2 2 0 0 1 2 2v10M17 19H7a2 2 0 0 1-2-2V7a2 2 0 0 1 .7-1.4"/>
          <path d="M2 2l20 20"/><path d="M16 17h.01"/>
        </svg>
        <h1 className="text-3xl font-bold text-primary mb-3">क्षमस्व!</h1>
        <p className="text-lg text-foreground/90 mb-8 leading-relaxed">
          भाऊ, मोबाईलमध्ये सगळं चालत नाही. <br/>उत्तम अनुभवासाठी कृपया डेस्कटॉप वापरा.
        </p>
        <Link href="/" legacyBehavior>
          <Button variant="default" size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            <ArrowLeft size={20} className="mr-2.5" />
            Back to Home
          </Button>
        </Link>
      </div>
      <footer className="absolute bottom-6 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Bharat Bang. All rights reserved.</p>
      </footer>
    </div>
  );
}
