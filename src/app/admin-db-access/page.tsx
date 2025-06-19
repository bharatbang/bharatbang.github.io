
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import AdminDbAccessClient from '@/components/admin-db-access-client';

export const metadata: Metadata = {
  title: 'Admin: View Chat Messages - Bharat Bang',
  description: 'View messages from the anonymous chat stored in Firestore.',
};

export default function AdminDbAccessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="py-6 animated-header-background text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight">Admin: View Chat Messages</h1>
            <Link href="/" legacyBehavior>
              <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
        <Alert variant="destructive" className="mb-6 bg-destructive/10 border-destructive/50 text-destructive">
          <ShieldAlert className="h-5 w-5" />
          <AlertTitle className="font-semibold">Security Warning</AlertTitle>
          <AlertDescription>
            This page directly accesses and displays database content. For a production application,
            ensure robust authentication and authorization mechanisms are in place to protect sensitive data.
            This is a simplified view for demonstration purposes.
          </AlertDescription>
        </Alert>
        <AdminDbAccessClient />
      </main>
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bharat Bang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
