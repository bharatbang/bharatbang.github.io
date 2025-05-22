
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ChatAnonymousClient from '@/components/chat-anonymous/chat-anonymous-client';

export const metadata: Metadata = {
  title: 'Chat Anonymous - Bharat Bang',
  description: 'Chat anonymously. Messages are not stored permanently.',
};

export default function ChatAnonymousPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="py-6 bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight">Chat Anonymous</h1>
            <Link href="/" legacyBehavior>
              <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow w-full flex flex-col overflow-hidden">
        <ChatAnonymousClient />
      </main>
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bharat Bang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
